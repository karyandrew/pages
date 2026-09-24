(() => {
  const nasaRoot = "https://github.com/nasa/NASA-3D-Resources/tree/master/";
  const nasaRaw = "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/";
  const commonsFile = "https://commons.wikimedia.org/wiki/File:";
  const commonsAsset = "https://commons.wikimedia.org/wiki/Special:Redirect/file/";

  const nasa = [
    ["nasa-apollo-11-landing-site","Apollo 11 landing site","Apollo%2011%20-%20Landing%20Site","high","Already a terrain slab. Use directly or crop lightly; nearly ideal support-free relief geometry."],
    ["nasa-apollo-15-landing-site","Apollo 15 landing site","Apollo%2015%20-%20Landing%20Site","high","Hadley–Apennine ridges and valleys should read strongly under ordinary side light."],
    ["nasa-apollo-17-landing-site","Apollo 17 landing site","Apollo%2017%20-%20Landing%20Site","high","Taurus–Littrow valley has a natural framed-landscape composition."],
    ["nasa-bennu","Asteroid Bennu","Asteroid%20101955%20Bennu","medium","Project one hemisphere of the diamond-like body into a centered medallion."],
    ["nasa-geographos","Asteroid Geographos","Asteroid%201620%20Geographos","medium","Elongated asymmetric silhouette with broad, uncomplicated depth."],
    ["nasa-kleopatra","Asteroid Kleopatra","Asteroid%20216%20Kleopatra","medium","Dog-bone form becomes an unusual abstract relief; keep the narrow waist shallow."],
    ["nasa-itokawa","Asteroid Itokawa","Asteroid%2025143%20Itokawa","medium","Lumpy contact-binary form suited to a medallion with a generous blank border."],
    ["nasa-vesta-a","Asteroid Vesta","Asteroid%204%20Vesta%20%28A%29","medium","Strong crater structure. Decimate first and suppress microtexture before projection."],
    ["nasa-toutatis","Asteroid Toutatis","Asteroid%204179%20Toutatis","medium","Irregular two-lobed profile with clean large-scale depth cues."],
    ["nasa-block-island","Block Island meteorite","Block%20Island","medium","Natural rock scan useful for testing how aggressively scan texture must be smoothed."]
  ].map(([id,title,base,tier,note]) => {
    const path = `3D%20Printing/${base}`;
    return {
      id,title,tier,note,kind:"mesh",collection:"NASA 3D Resources",
      source:`${nasaRoot}${path}`,
      preview:`${nasaRaw}${path}/${base}.png`,
      download:`${nasaRaw}${path}/${base}.stl`
    };
  });

  const haeckel = [
    ["haeckel-ammonitida","Ammonites","Haeckel%20Ammonitida.jpg","Haeckel_Ammonitida.jpg","high","Crop one to three shells. Broad ribs should survive coarse FDM better than fine engraving."],
    ["haeckel-arachnida","Arachnids","Haeckel%20Arachnida.jpg","Haeckel_Arachnida.jpg","experimental","Strong silhouettes but many thin legs. Crop one spider and print it larger."],
    ["haeckel-orchidae","Orchids","Haeckel%20Orchidae.jpg","Haeckel_Orchidae.jpg","medium","Layered petals can work after background flattening; crop one flower."],
    ["haeckel-discomedusae-8","Jellyfish","Haeckel%20Discomedusae%208.jpg","Haeckel_Discomedusae_8.jpg","medium","Use one or two radial bells; the long fine tentacles otherwise disappear."],
    ["haeckel-anthomedusae","Hydromedusae","Haeckel%20Anthomedusae.jpg","Haeckel_Anthomedusae.jpg","high","Strong radial anatomy with a clean scientific-diagram character."],
    ["haeckel-spumellaria","Radiolarians","Haeckel%20Spumellaria.jpg","Haeckel_Spumellaria.jpg","medium","Crop one geometric organism and enforce a nozzle-aware minimum feature size."],
    ["haeckel-actiniae","Sea anemones","Haeckel%20Actiniae.jpg","Haeckel_Actiniae.jpg","high","Broad organic masses and folded radial texture; a strong whole-plate candidate after blur."],
    ["haeckel-hexacoralla","Corals","Haeckel%20Hexacoralla.jpg","Haeckel_Hexacoralla.jpg","high","Crop one coral skeleton and remove labels and background tone."],
    ["haeckel-tetracoralla","Rugose corals","Haeckel%20Tetracoralla.jpg","Haeckel_Tetracoralla.jpg","high","Fossil-like sections with strong, restrained geometry."],
    ["haeckel-trochilidae","Hummingbirds","Haeckel%20Trochilidae.jpg","Haeckel_Trochilidae.jpg","experimental","Disconnected birds, feathers, and negative space make this a selective-crop experiment."]
  ].map(([id,title,file,wiki,tier,note]) => ({
    id,title,tier,note,kind:"image",collection:"Ernst Haeckel — Kunstformen der Natur",
    source:`${commonsFile}${wiki}`,
    preview:`${commonsAsset}${file}?width=900`,
    download:`${commonsAsset}${file}`
  }));

  const maps = [
    {
      id:"map-au-park", title:"AU Park neighborhood", coords:[-77.0890,38.9495],
      zoom:14.6, pitch:66, bearing:28, exaggeration:3.4, mode:"terrain + buildings",
      note:"Low rolling terrain plus detached-house massing. This is the clearest local test of whether residential building texture survives at neighborhood scale.",
      recipe:"https://github.com/karyandrew/3d-printing/blob/main/projects/office-reliefs/README.md#fast-path-d--au-park--washington-dc"
    },
    {
      id:"map-bethesda", title:"Bethesda core", coords:[-77.0947,38.9847],
      zoom:14.5, pitch:67, bearing:-32, exaggeration:3.0, mode:"terrain + buildings",
      note:"A denser urban center where towers, blocks, roads, and mild terrain can all contribute without requiring tiny facade detail.",
      recipe:"https://github.com/karyandrew/3d-printing/blob/main/projects/office-reliefs/README.md#fast-path-c--bethesda--montgomery-county"
    },
    {
      id:"map-georgetown", title:"Georgetown and Potomac bluffs", coords:[-77.0654,38.9097],
      zoom:14.0, pitch:69, bearing:112, exaggeration:3.8, mode:"terrain + buildings",
      note:"A stronger topographic composition: river edge, escarpment, dense blocks, and campus-scale structures in one crop.",
      recipe:"https://github.com/karyandrew/3d-printing/blob/main/projects/office-reliefs/README.md#fast-path-d--au-park--washington-dc"
    },
    {
      id:"map-great-falls", title:"Great Falls and the Potomac gorge", coords:[-77.2520,38.9955],
      zoom:12.2, pitch:72, bearing:35, exaggeration:2.4, mode:"terrain-first",
      note:"Terrain-only relief where the landform is the subject: gorge, islands, channels, and steep banks without an urban texture layer.",
      recipe:"https://github.com/karyandrew/3d-printing/blob/main/projects/office-reliefs/README.md#nationwide-terrain-fallback"
    }
  ];

  window.RELIEF_CATALOG = { sources:[...nasa,...haeckel], maps };
})();
