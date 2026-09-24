(() => {
  "use strict";

  const catalog = window.RELIEF_CATALOG || { sources:[], maps:[] };
  const gallery = document.querySelector("#gallery");
  const mapGrid = document.querySelector("#map-grid");
  const empty = document.querySelector("#empty");
  const count = document.querySelector("#count");
  const search = document.querySelector("#search");
  const filters = [...document.querySelectorAll(".filter[data-filter]")];
  let activeFilter = "all";

  const escapeHTML = value => String(value).replace(/[&<>'"]/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;"
  }[char]));

  const kindLabel = kind => kind === "mesh" ? "3-D model" : "Image";
  const tierLabel = tier => ({
    high:"Best first trial",
    medium:"Needs preparation",
    experimental:"Experimental"
  }[tier] || tier);

  function makeSourceCard(item) {
    const article = document.createElement("article");
    article.className = "card";
    article.dataset.kind = item.kind;
    article.dataset.tier = item.tier;
    article.dataset.search = `${item.title} ${item.note} ${item.collection} ${item.id}`.toLowerCase();
    article.innerHTML = `
      <a class="image-link" href="${item.source}" target="_blank" rel="noopener noreferrer" aria-label="View source page for ${escapeHTML(item.title)}">
        <img src="${item.preview}" alt="${escapeHTML(item.title)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">
      </a>
      <div class="card-body">
        <div class="meta">
          <span class="badge">${kindLabel(item.kind)}</span>
          <span class="badge ${item.tier}">${tierLabel(item.tier)}</span>
        </div>
        <h3>${escapeHTML(item.title)}</h3>
        <p class="note">${escapeHTML(item.note)}</p>
        <span class="candidate-id">${escapeHTML(item.id)}</span>
        <div class="actions">
          <a class="action primary" href="${item.download}" target="_blank" rel="noopener noreferrer">Original asset ↗</a>
          <a class="action" href="${item.source}" target="_blank" rel="noopener noreferrer">Source &amp; rights ↗</a>
        </div>
      </div>`;
    return article;
  }

  function makeMapCard(item) {
    const article = document.createElement("article");
    article.className = "map-card";
    article.innerHTML = `
      <div class="map-stage">
        <div class="map-canvas" id="${item.id}" role="img" aria-label="Live three-dimensional map preview of ${escapeHTML(item.title)}"></div>
        <div class="map-state" id="${item.id}-state">Loading live terrain + building data…</div>
      </div>
      <div class="map-copy">
        <div class="meta">
          <span class="badge high">Live map relief</span>
          <span class="badge">${escapeHTML(item.mode)}</span>
        </div>
        <h3>${escapeHTML(item.title)}</h3>
        <p class="note">${escapeHTML(item.note)}</p>
        <span class="candidate-id">${item.coords[1].toFixed(4)}°, ${item.coords[0].toFixed(4)}° · source preview, not final STL</span>
        <div class="actions">
          <a class="action primary" href="${item.recipe}" target="_blank" rel="noopener noreferrer">Generation recipe ↗</a>
          <a class="action" href="https://www.openstreetmap.org/?mlat=${item.coords[1]}&amp;mlon=${item.coords[0]}#map=15/${item.coords[1]}/${item.coords[0]}" target="_blank" rel="noopener noreferrer">Inspect place ↗</a>
        </div>
      </div>`;
    return article;
  }

  catalog.sources.forEach(item => gallery.append(makeSourceCard(item)));
  catalog.maps.forEach(item => mapGrid.append(makeMapCard(item)));

  function applyFilters() {
    const term = search.value.trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll(".card").forEach(card => {
      const categoryMatch = activeFilter === "all" || card.dataset.kind === activeFilter || card.dataset.tier === activeFilter;
      const textMatch = !term || card.dataset.search.includes(term);
      card.hidden = !(categoryMatch && textMatch);
      if (!card.hidden) visible += 1;
    });
    count.textContent = `${visible} of ${catalog.sources.length} sources shown`;
    empty.hidden = visible !== 0;
  }

  filters.forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach(other => other.setAttribute("aria-pressed", String(other === button)));
    applyFilters();
  }));
  search.addEventListener("input", applyFilters);
  applyFilters();

  function simplifyStyle(map) {
    const style = map.getStyle();
    for (const layer of style.layers || []) {
      try {
        if (layer.type === "symbol") {
          map.setLayoutProperty(layer.id, "visibility", "none");
        } else if (layer.type === "background") {
          map.setPaintProperty(layer.id, "background-color", "#cbc6ba");
        } else if (layer.type === "fill-extrusion") {
          map.setPaintProperty(layer.id, "fill-extrusion-color", "#ebe3d5");
          map.setPaintProperty(layer.id, "fill-extrusion-opacity", .94);
        } else if (layer.type === "line") {
          map.setPaintProperty(layer.id, "line-color", "#77736a");
          map.setPaintProperty(layer.id, "line-opacity", .44);
        } else if (layer.type === "fill") {
          const id = layer.id.toLowerCase();
          const fill = id.includes("water") ? "#a8b3b4" :
            (id.includes("park") || id.includes("landcover") || id.includes("wood")) ? "#c4c8b9" :
            "#d8d2c6";
          map.setPaintProperty(layer.id, "fill-color", fill);
          map.setPaintProperty(layer.id, "fill-opacity", .82);
        }
      } catch (error) {
        console.debug("Layer restyle skipped", layer.id, error);
      }
    }
  }

  function initializeMap(item) {
    const state = document.getElementById(`${item.id}-state`);
    if (!window.maplibregl || !maplibregl.supported()) {
      state.textContent = "Live WebGL preview unavailable on this browser.";
      state.classList.add("error");
      return;
    }

    const map = new maplibregl.Map({
      container:item.id,
      style:"https://styles.maptoolkit.org/street-3d.json",
      center:item.coords,
      zoom:item.zoom,
      pitch:item.pitch,
      bearing:item.bearing,
      maxPitch:85,
      antialias:true,
      scrollZoom:false,
      attributionControl:{ compact:false }
    });

    map.on("load", () => {
      simplifyStyle(map);
      try {
        map.setTerrain({ source:"rgb-tiles", exaggeration:item.exaggeration });
      } catch (error) {
        console.debug("Terrain exaggeration unavailable", error);
      }
    });

    map.once("idle", () => {
      state.textContent = "Live source preview · drag to inspect";
    });

    map.on("error", event => {
      const message = event?.error?.message || "";
      if (message && !message.includes("glyph") && !message.includes("sprite")) {
        state.textContent = "Live map source temporarily unavailable.";
        state.classList.add("error");
      }
    });
  }

  if (!("IntersectionObserver" in window)) {
    catalog.maps.forEach(initializeMap);
    return;
  }

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const item = catalog.maps.find(candidate => candidate.id === entry.target.id);
      if (item && !entry.target.dataset.initialized) {
        entry.target.dataset.initialized = "true";
        initializeMap(item);
      }
      observer.unobserve(entry.target);
    }
  }, { rootMargin:"240px" });

  document.querySelectorAll(".map-canvas").forEach(element => observer.observe(element));
})();
