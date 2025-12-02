// heki

// fo valtozok
let allomasok = [];
let vonalak = [];
let statusz = null;

//#region init stuff
// ---------------------------------
// allomas es vonal betolt
// ---------------------------------
async function loadData() {
    try {
        const allomasokTolt = await fetch('stations.json');
        allomasok = await allomasokTolt.json();
        
        const vonalakResponse = await fetch('lines.json');
        vonalak = await vonalakResponse.json();
        
        console.log('Adatok betöltve:', { allomasok: allomasok.length, vonalak: vonalak.length });
    } catch (e) {
        console.error('Betöltés hiba:', e);
    }
}

// ---------------------------------
// jatek statusz betolt
// ---------------------------------

function initstate(jatekosNev) {
    const vonalidk = vonalak.map(line => line.id);
    const vonalVeletlenSorrend = shuffleUpGood([...vonalidk]);
    
    statusz = {
        jatekosNev: jatekosNev,
        vonalVeletlenSorrend: vonalVeletlenSorrend,
        aktivVonalid: 0,
        aktivKor: 0,
        pakli: [],
        huzottLapok: [],
        huzottKartyaSzam: 0,
        platformTipusSzam: { kulso: 0, belso: 0 },
        tablaSzegmensek: [],
        kivalasztottKartya: null,
        kivalasztottAllomas: null,
        valtoAktiv: false,
        kovetkezoKartya: null,
        elertAllomasok: {},
        korPontok: [],
        ido: { kezd: Date.now(), eltelt: 0 },
        vonatCsuszka: 0
    };
    
    allomasok.forEach(station => {statusz.elertAllomasok[station.id] = new Set();});
}

// ---------------------------------
// pakli betolt
// ---------------------------------
function initDeck() {
    const pakli = [];
    
    // kulso peron: A, B, C, D, joker
    pakli.push({ tipus: 'A', platform: 'kulso' });
    pakli.push({ tipus: 'B', platform: 'kulso' });
    pakli.push({ tipus: 'C', platform: 'kulso' });
    pakli.push({ tipus: 'D', platform: 'kulso' });
    pakli.push({ tipus: 'Joker', platform: 'kulso' });
    
    // belso peron: A, B, C, D, joker, valto
    pakli.push({ tipus: 'A', platform: 'belso' });
    pakli.push({ tipus: 'B', platform: 'belso' });
    pakli.push({ tipus: 'C', platform: 'belso' });
    pakli.push({ tipus: 'D', platform: 'belso' });
    pakli.push({ tipus: 'Joker', platform: 'belso' });
    pakli.push({ tipus: 'Switch', platform: 'belso' });
    
    return shuffleUpGood(pakli); // itt keverem
}
//#endregion

//#region keveres
// ---------------------------------
// keveres
// ---------------------------------
function shuffleUpGood(tomb) {
    const kevert = [...tomb];
    for (let i = kevert.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [kevert[i], kevert[j]] = [kevert[j], kevert[i]];
    }
    return kevert;
}
//#endregion

//#region kartya kezeles
// ---------------------------------
// kartya huzas
// ---------------------------------
function drawCard() {
    if (statusz.pakli.length === 0) {
        return null;
    }
    
    const kartya = statusz.pakli.pop();
    statusz.huzottLapok.push(kartya);
    statusz.huzottKartyaSzam = statusz.huzottKartyaSzam + 1;
    
    //platform tipus alapjan huzott tipus noveles
    statusz.platformTipusSzam[kartya.platform] = statusz.platformTipusSzam[kartya.platform] + 1;
    
    if (kartya.tipus === 'Switch') {
        statusz.valtoAktiv = true;
        statusz.kivalasztottKartya = kartya;
        if (statusz.pakli.length > 0) {
            const kovetkezoKartya = statusz.pakli.pop();
            statusz.huzottLapok.push(kovetkezoKartya);
            statusz.platformTipusSzam[kovetkezoKartya.platform] = statusz.platformTipusSzam[kovetkezoKartya.platform] + 1;
            statusz.kovetkezoKartya = kovetkezoKartya;
        }
    } else {
        statusz.kivalasztottKartya = kartya;
        statusz.valtoAktiv = false;
    }
    
    return kartya;
}

// ---------------------------------
// auto kartya huzas epites utan
// ---------------------------------
function autoDrawNextCard() {
    if (statusz.pakli.length > 0) {
        drawCard();
    }
}
//#endregion

//#region jatekter es kiemel
// ---------------------------------
// racs megjelenites
// ---------------------------------
function renderGrid() {
    const grid = document.querySelector('#game-grid');
    grid.innerHTML = '';
    
    const vonalidMost = statusz.vonalVeletlenSorrend[statusz.aktivVonalid];
    const vonalMost = vonalak.find(line => line.id === vonalidMost);
    
    // nincs aktiv metro, nem renderel
    if (!vonalMost) return;
    
    for (let yPozi = 0; yPozi < 10; yPozi = yPozi + 1) {
        for (let xPozi = 0; xPozi < 10; xPozi = xPozi + 1) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.x = xPozi;
            cell.dataset.y = yPozi;
            
            const station = allomasok.find(station => station.x === xPozi && station.y === yPozi);
            
            if (station) {
                cell.dataset.stationId = station.id;
                
                const icon = document.createElement('div');
                icon.className = 'station-icon';
                
                const kep = document.createElement('img');
                const metroStartLine = vonalak.find(line => line.start === station.id);
                const stationtipus = station.type.toLowerCase();
                
                let iconPath = 'source/mezok/';
                if (station.type === '?') {
                    iconPath += 'deak_ter.svg';
                } else if (metroStartLine) {
                    iconPath += `${stationtipus}_${metroStartLine.name.toLowerCase()}.svg`;
                } else if (station.train) {
                    iconPath += `${stationtipus}_vonat.svg`;
                } else {
                    iconPath += `${stationtipus}.svg`;
                }
                
                kep.src = iconPath;
                kep.alt = station.type;
                icon.appendChild(kep);
                cell.appendChild(icon);
                
                if (station.id === vonalMost.start) {
                    cell.classList.add('start-station');
                    cell.style.borderColor = vonalMost.color;
                }
                
                cell.addEventListener('click', () => handleStationClick(station));
            }
            grid.appendChild(cell);
        }
    }
    highlightEndpoints();
}

// ---------------------------------
// vegpontok kiemeles
// ---------------------------------
function highlightEndpoints() {
    const currentLineId = statusz.vonalVeletlenSorrend[statusz.aktivVonalid];
    const endpoints = getLineEndpoints(currentLineId);
    
    const allCells = document.querySelectorAll('.grid-cell');
    allCells.forEach(cell => {
        cell.classList.remove('endpoint', 'valid-target', 'invalid-target', 'switch-available');
    });
    
    // valto aktiv mindent megjelenit
    if (statusz.valtoAktiv === true && statusz.kivalasztottKartya !== null) {
        const vonalAllomasok = getvonalAllomasok(currentLineId);
        
        // vonal max 2 hosszu, csak vegpontok
        if (vonalAllomasok.length < 2) {
            endpoints.forEach(stationId => {
                const cell = document.querySelector(`[data-station-id="${stationId}"]`);
                if (cell) {
                    cell.classList.add('endpoint');
                }
            });
        } else {
            // minden allomas kiemelve hosszabb mint 3
            vonalAllomasok.forEach(stationId => {
                const cell = document.querySelector(`[data-station-id="${stationId}"]`);
                if (cell) {
                    const isEndpoint = endpoints.includes(stationId);
                    if (isEndpoint) {
                        cell.classList.add('endpoint');
                    } else {
                        cell.classList.add('switch-available');
                    }
                }
            });
        }
        return;
    }
    
    // default vegpont kiemel
    endpoints.forEach(stationId => {
        const cell = document.querySelector(`[data-station-id="${stationId}"]`);
        if (cell) {
            cell.classList.add('endpoint');
        }
    });
}
//#endregion

//#region vegpont keres
// ---------------------------------
// vegpont meghatarozas
// ---------------------------------
function getLineEndpoints(lineId) {
    const vonalSzegmensek = statusz.tablaSzegmensek.filter(segment => segment.lineId === lineId);
    
    if (vonalSzegmensek.length === 0) {
        const line = vonalak.find(line => line.id === lineId);
        return [line.start];
    }
    
    const stationConnections = {};
    vonalSzegmensek.forEach(segment => {
        stationConnections[segment.from] = (stationConnections[segment.from] || 0) + 1; // itt a rovoditve ellenorzom hogy 0-nal nagyobb szam vagy sem
        stationConnections[segment.to] = (stationConnections[segment.to] || 0) + 1;
    });
    
    const endpoints = [];
    for (const stationId in stationConnections) {
        const connectionCount = stationConnections[stationId];
        if (connectionCount === 1) {
            endpoints.push(parseInt(stationId));
        }
    }
    
    return endpoints;
}
//#endregion

//#region metro allomasok
// ---------------------------------
// metro allomasok
// ---------------------------------
function getvonalAllomasok(lineId) {
    const vonalakegmensek = statusz.tablaSzegmensek.filter(segment => segment.lineId === lineId);
    const allomasok = new Set();
    
    vonalakegmensek.forEach(segment => {
        allomasok.add(segment.from);
        allomasok.add(segment.to);
    });
    
    return Array.from(allomasok);
}
//#endregion

//#region kattintas kezelo
// ---------------------------------
// allomas kattintas kezelo
// ---------------------------------
function handleStationClick(station) {
    if (statusz.kivalasztottKartya === null) {
        return;
    }
    
    const currentLineId = statusz.vonalVeletlenSorrend[statusz.aktivVonalid];
    const endpoints = getLineEndpoints(currentLineId);
    
    // valto -> barhonnan epitheto
    let validStartStations = [];
    if (statusz.valtoAktiv === true) {
        const vonalAllomasok = getvonalAllomasok(currentLineId);
        // allomas lista tul rovid (kisebb mint 2), csak a ket vegpontot adom vissza
        if (vonalAllomasok.length < 2) {
            validStartStations = endpoints;
        } else {
            validStartStations = vonalAllomasok;
        }
    } else {
        validStartStations = endpoints; // nincs valto default vegpontokat adom vissza
    }
    
    if (statusz.kivalasztottAllomas === null) {
        // elso kattintas (nincs kivalasztott allomas) ha valid akkor beirom aktivnak
        const isValidStart = validStartStations.includes(station.id);
        if (isValidStart === true) {
            statusz.kivalasztottAllomas = station.id;
            highlightValidTargets(station.id);
        }
    } else {
        // masodik kattintas, epitem ha a szakasz epitheto
        const canBuild = canBuildSegment(statusz.kivalasztottAllomas, station.id, currentLineId);
        if (canBuild === true) {
            buildSegment(statusz.kivalasztottAllomas, station.id, currentLineId);
            statusz.kivalasztottAllomas = null;
            statusz.kivalasztottKartya = null;
            
            // a valto deaktival minden epites utan
            statusz.valtoAktiv = false;
            
            // auto uj kartya ha epitett
            autoDrawNextCard();
            
            checkRoundEnd();
            renderGrid();
            updateUI();
        } else {
            statusz.kivalasztottAllomas = null;
            highlightEndpoints();
        }
    }
}
//#endregion

//#region epitheto kiemel
// ---------------------------------
// ervenyes celallomasok kiemel
// ---------------------------------
function highlightValidTargets(allomasID) {
    const currentLineId = statusz.vonalVeletlenSorrend[statusz.aktivVonalid];
    const fromStation = allomasok.find(s => s.id === allomasID);
    // torlom a korabbi kiemeleseket
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.classList.remove('valid-target', 'invalid-target');
    });
    
    allomasok.forEach(toStation => {
        if (toStation.id === allomasID) return; // sajat magat nem jelenitheti meg

        const cell = document.querySelector(`[data-station-id="${toStation.id}"]`);
        if (!cell) return;
        
        if (canBuildSegment(allomasID, toStation.id, currentLineId)) { 
            cell.classList.add('valid-target');
        }
    });
}
//#endregion

//#region epit szabaly check
// ---------------------------------
// szakasz epitheto check
// ---------------------------------
function canBuildSegment(honnanID, hovaID, lineId) {
    const fromStation = allomasok.find(s => s.id === honnanID);
    const toStation = allomasok.find(s => s.id === hovaID);
    
    if (!fromStation || !toStation || honnanID === hovaID) return false;
    
    // vizszintes, fuggoleges atlok
    const dx = Math.abs(toStation.x - fromStation.x);
    const dy = Math.abs(toStation.y - fromStation.y);
    if (dx !== 0 && dy !== 0 && dx !== dy) return false;
    
    // kartya tipus ellenorzes
    const kartya = statusz.valtoAktiv ? statusz.kovetkezoKartya : statusz.kivalasztottKartya;
    if (kartya && kartya.tipus !== 'Joker' && toStation.type !== '?' && kartya.tipus !== toStation.type) {
        return false;
    }
    
    // kettos szakasz check
    if (statusz.tablaSzegmensek.some(s => 
        (s.from === honnanID && s.to === hovaID) || (s.from === hovaID && s.to === honnanID)
    )) return false;
    
    // hurok tilt
    const vonalAllomasok = new Set();
    statusz.tablaSzegmensek.filter(s => s.lineId === lineId).forEach(s => {
        vonalAllomasok.add(s.from);
        vonalAllomasok.add(s.to);
    });

    if (vonalAllomasok.has(hovaID)) {
        const isNeighbor = statusz.tablaSzegmensek.some(s => s.lineId === lineId &&
            ((s.from === honnanID && s.to === hovaID) || (s.to === honnanID && s.from === hovaID))
        );
        if (!isNeighbor) return false;
    }
    
    // allomas atlep, palya keresztezes
    if (getallomasokKoztuk(fromStation, toStation).length > 0) return false;
    if (kereszetezesCheck(fromStation, toStation, lineId)) return false;
    
    return true;
}
//#endregion

//#region allomas kozottuk
// ---------------------------------
// koztuk levo allomasok
// ---------------------------------
function getallomasokKoztuk(from, to) {
    const kozottuk = [];
    
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    
    if (steps <= 1) return kozottuk;
    
    const stepX = dx === 0 ? 0 : dx / Math.abs(dx);
    const stepY = dy === 0 ? 0 : dy / Math.abs(dy);
    
    for (let i = 1; i < steps; i++) {
        const checkX = from.x + (stepX * i);
        const checkY = from.y + (stepY * i);
        
        const station = allomasok.find(s => s.x === checkX && s.y === checkY);
        if (station) kozottuk.push(station);
    }
    
    return kozottuk;
}
//#endregion

//#region keresztezes check
// ---------------------------------
// keresztezodes check
// ---------------------------------
function kereszetezesCheck(from, to) {
    for (const segment of statusz.tablaSzegmensek) {
        const segFrom = allomasok.find(s => s.id === segment.from);
        const segTo = allomasok.find(s => s.id === segment.to);
        
        const intersectionPoint = getIntersectionPoint(from, to, segFrom, segTo);
        
        if (intersectionPoint) {
            // vegpont check 
            const isEndpointOfNewSegment = 
                (from.x === intersectionPoint.x && from.y === intersectionPoint.y) ||
                (to.x === intersectionPoint.x && to.y === intersectionPoint.y);
            
            const isEndpointOfExistingSegment = 
                (segFrom.x === intersectionPoint.x && segFrom.y === intersectionPoint.y) ||
                (segTo.x === intersectionPoint.x && segTo.y === intersectionPoint.y);

            // ket szakasz kozos vegpont, allomas
            if (isEndpointOfNewSegment && isEndpointOfExistingSegment) {
                continue;
            }
            
            // metszespontban allomas, tovabb
            const stationAtIntersection = allomasok.find(s => 
                s.x === intersectionPoint.x && s.y === intersectionPoint.y
            );
            
            if (stationAtIntersection) {
                continue;
            }
            
            // ha nincs akkor nem lehet keresztezni
            return true;
        }
    }
    
    return false;
}

// ---------------------------------
// szakasz racspontok
// ---------------------------------
function getPointsOnSegment(p1, p2) {
    const points = [];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    
    if (steps === 0) {
        return [{ x: p1.x, y: p1.y }];
    }
    
    // egysegvektor -1, 0, 1 lep
    const stepX = dx === 0 ? 0 : dx / Math.abs(dx);
    const stepY = dy === 0 ? 0 : dy / Math.abs(dy);
    
    // minden racsvonal bejar
    for (let i = 0; i <= steps; i++) {
        points.push({
            x: p1.x + (stepX * i),
            y: p1.y + (stepY * i)
        });
    }
    
    return points;
}

// ---------------------------------
// metszespont meghataroz 
// ---------------------------------
function getIntersectionPoint(a1, a2, b1, b2) {
    // min 8x dolgoztam at mert vagy az atlok vagy a masik vagany logika nem mukodott...
    // mat.alapok determinans-al oldom meg
    // irany vektorok
    const dx1 = a2.x - a1.x;
    const dy1 = a2.y - a1.y;
    const dx2 = b2.x - b1.x;
    const dy2 = b2.y - b1.y;
    
    // parhuzamos check
    const det = dx1 * dy2 - dy1 * dx2;
    
    // parhuzamos szakaszok
    if (Math.abs(det) < 0.0001) {
        // racsponti egyezes
        const aPoints = getPointsOnSegment(a1, a2);
        const bPoints = getPointsOnSegment(b1, b2);
        
        for (const aPoint of aPoints) {
            for (const bPoint of bPoints) {
                if (aPoint.x === bPoint.x && aPoint.y === bPoint.y) {
                    return { x: aPoint.x, y: aPoint.y };
                }
            }
        }
        return null;
    }
    
    // parametrikus egyenlet
    const t = ((b1.x - a1.x) * dy2 - (b1.y - a1.y) * dx2) / det;
    const u = ((b1.x - a1.x) * dy1 - (b1.y - a1.y) * dx1) / det;
    
    // metszespont szakaszon belul check
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
            x: a1.x + t * dx1,
            y: a1.y + t * dy1
        };
    }
    return null;
}
//#endregion

//#region vonal epit+jelenit
// ---------------------------------
// szakasz epites
// ---------------------------------
function buildSegment(fromId, toId, lineId) {
    statusz.tablaSzegmensek.push({
        lineId,
        from: fromId,
        to: toId
    });
    
    // palyaudvar csuszka check
    [fromId, toId].forEach(stationId => {
        const station = allomasok.find(s => s.id === stationId);
        if (station && station.train) {
            if (statusz.vonatCsuszka < 10) {
                statusz.vonatCsuszka++;
            }
        }
    });
    
    // allomas talalatok
    [fromId, toId].forEach(stationId => {
        statusz.elertAllomasok[stationId].add(lineId);
    });
    
    // valto vissza all
    statusz.valtoAktiv = false;
    
    rendervonalak();
}

// ---------------------------------
// svg vonal rajzol
// ---------------------------------
function rendervonalak() {
    const svg = document.querySelector('#lines-svg');
    const grid = document.querySelector('#game-grid');
    
    if (!svg || !grid) return;
    
    // svg meret es illesztes
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 10 10`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    
    // regi vonalak torol
    let svgContent = '';
    
    statusz.tablaSzegmensek.forEach(segment => {
        const fromStation = allomasok.find(s => s.id === segment.from);
        const toStation = allomasok.find(s => s.id === segment.to);
        const line = vonalak.find(l => l.id === segment.lineId);
        
        if (!fromStation || !toStation || !line) return;
        
        // kozeppontok
        const x1 = fromStation.x + 0.5;
        const y1 = fromStation.y + 0.5;
        const x2 = toStation.x + 0.5;
        const y2 = toStation.y + 0.5;
        
        svgContent += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${line.color}" vector-effect="non-scaling-stroke" class="line-segment"></line>`;
    });
    
    svg.innerHTML = svgContent;
}
//#endregion

//#region kor vege
// ---------------------------------
// kor vege check
// ---------------------------------
function checkRoundEnd() {
    // 8. kartya utan vagy valamelyik tipus 5 vagy kartya elfogyott
    if ( //statusz.huzottKartyaSzam >= 8 ||
        statusz.platformTipusSzam.kulso >= 5 || 
        statusz.platformTipusSzam.belso >= 5 || 
        statusz.pakli.length === 0) {
        endRound();
    }
}

// ---------------------------------
// kor vege
// ---------------------------------
function endRound() {
    const currentLineId = statusz.vonalVeletlenSorrend[statusz.aktivVonalid];
    const roundScore = calculateRoundPoints(currentLineId);
    
    statusz.korPontok.push({
        lineId: currentLineId,
        score: roundScore
    });
    
    updateScoring();
    
    statusz.aktivVonalid++;
    
    if (statusz.aktivVonalid >= statusz.vonalVeletlenSorrend.length) {
        endGame();
    } else {
        startNewRound();
    }
}
//#endregion

//#region uj kor
// ---------------------------------
// uj kor kezd
// ---------------------------------
function startNewRound() {
    statusz.aktivKor++;
    statusz.pakli = initDeck();
    statusz.huzottLapok = [];
    statusz.huzottKartyaSzam = 0;
    statusz.platformTipusSzam = { kulso: 0, belso: 0 };
    statusz.kivalasztottKartya = null;
    statusz.kivalasztottAllomas = null;
    statusz.valtoAktiv = false;
    statusz.kovetkezoKartya = null;
    
    updateUI();
    renderGrid();
}
//#endregion

//#region fordulo pontok
// ---------------------------------
// fordulo pontszam szamol
// ---------------------------------
function calculateRoundPoints(lineId) {
    const vonalSzegmensek = statusz.tablaSzegmensek.filter(s => s.lineId === lineId);
    
    if (vonalSzegmensek.length === 0) return { PK: 0, PM: 0, PD: 0, FP: 0 };
    
    // erintett allomasok
    const erintettAllomasok = new Set();
    vonalSzegmensek.forEach(segment => {
        erintettAllomasok.add(segment.from);
        erintettAllomasok.add(segment.to);
    });
    
    // PK - kulonbozo keruletek 
    // PM - max megallo egy keruletben
    const districtCounts = {};
    erintettAllomasok.forEach(stationId => {
        const station = allomasok.find(s => s.id === stationId);
        if (station) {
            districtCounts[station.district] = (districtCounts[station.district] || 0) + 1;
        }
    });
    
    const counts = Object.values(districtCounts);
    const PK = counts.length;
    const PM = counts.length > 0 ? Math.max(...counts) : 0; 
    
    // PD - duna atkelesek
    let PD = 0;
    vonalSzegmensek.forEach(segment => {
        const fromStation = allomasok.find(s => s.id === segment.from);
        const toStation = allomasok.find(s => s.id === segment.to);
        if (fromStation && toStation && fromStation.side !== toStation.side) {
            PD++;
        }
    });
    
    const FP = (PK * PM) + PD;

    return { PK, PM, PD, FP };
}
//#endregion

//#region jatek vege+pontok
// ---------------------------------
// jatek vege
// ---------------------------------
function endGame() {
    statusz.ido.eltelt = Date.now() - statusz.ido.kezd;
    
    const finalScore = calculateFinalScore();
    
    saveResult({
        name: statusz.jatekosNev,
        points: finalScore.total,
        time: statusz.ido.eltelt
    });
    
    jatekVegeLap(finalScore);
}

// ---------------------------------
// vegso pontszamitas
// ---------------------------------
function calculateFinalScore() {
    // korpontok osszege
    let totalRoundPoints = 0;
    for (let i = 0; i < statusz.korPontok.length; i = i + 1) {
        const round = statusz.korPontok[i];
        totalRoundPoints = totalRoundPoints + round.score.FP;
    }
    
    // PP = palyaudvar pontok
    const railwayPointsTable = [0, 1, 2, 4, 6, 8, 11, 14, 17, 21, 25];
    let railwayPoints = 0;
    if (statusz.vonatCsuszka < railwayPointsTable.length) {
        railwayPoints = railwayPointsTable[statusz.vonatCsuszka];
    } else {
        railwayPoints = railwayPointsTable[railwayPointsTable.length - 1];
    }
    
    // csomopont pontok
    let kettesCsomopont = 0;
    let harmasCsomopont = 0;
    let negyesCsomopont = 0;
    
    const entries = Object.entries(statusz.elertAllomasok);
    for (let i = 0; i < entries.length; i = i + 1) {
        const vonalakSet = entries[i][1];
        const lineCount = vonalakSet.size;
        
        if (lineCount === 2) {
            kettesCsomopont = kettesCsomopont + 1;
        } else if (lineCount === 3) {
            harmasCsomopont = harmasCsomopont + 1;
        } else if (lineCount >= 4) {
            negyesCsomopont = negyesCsomopont + 1;
        }
    }

    const connectionPoints = (2 * kettesCsomopont) + (5 * harmasCsomopont) + (9 * negyesCsomopont);
    
    // osszesites, fordulo pontok + palyaudvar pontok + csomopontok osszpontja
    const total = totalRoundPoints + railwayPoints + connectionPoints;
    
    return {
        roundPoints: totalRoundPoints,
        railwayPoints: railwayPoints,
        vonatCsuszka: statusz.vonatCsuszka,
        connectionPoints: connectionPoints,
        CSP2: kettesCsomopont,
        CSP3: harmasCsomopont,
        CSP4: negyesCsomopont,
        total: total
    };
}
//#endregion

//#region eredmeny ment
// ---------------------------------
// eredmeny mentes
// ---------------------------------
function saveResult(result) {
    let results = JSON.parse(localStorage.getItem('metroResults') || '[]');
    results.push(result);
    results.sort((a, b) => b.points - a.points);
    localStorage.setItem('metroResults', JSON.stringify(results));
}

// ---------------------------------
// eredmenyek betolt
// ---------------------------------
function loadResults() {
    return JSON.parse(localStorage.getItem('metroResults') || '[]');
}
//#endregion


//#region ui kezelok
// ---------------------------------
// ui frissit
// ---------------------------------
function updateUI() {
    const currentLineId = statusz.vonalVeletlenSorrend[statusz.aktivVonalid];
    const currentLine = vonalak.find(line => line.id === currentLineId);
    
    if (!currentLine) return;
    
    document.querySelector('#player-name-display').textContent = statusz.jatekosNev;
    document.querySelector('#line-color').style.backgroundColor = currentLine.color;
    document.querySelector('#line-name').textContent = currentLine.name;
    document.querySelector('#round-number').textContent = statusz.aktivVonalid + 1;
    
    const cardDisplay = document.querySelector('#card-display');
    
    if (statusz.kivalasztottKartya) {
        const kartya = statusz.kivalasztottKartya;
        
        // valto es sima huzas kulon
        if (statusz.valtoAktiv === true && statusz.kovetkezoKartya !== null) {
            const kovetkezo = statusz.kovetkezoKartya;
            let kovetkezoHTML = '';
            // valto joker
            if (kovetkezo.tipus === 'Joker') {
                const kartyaHatter = kovetkezo.platform === 'kulso' ? 'kulso.svg' : 'belso.svg';
                kovetkezoHTML = `
                    <img src="source/kartyak/${kartyaHatter}" alt="Joker" style="height: 60px; width: auto; display: block;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); ">
                        🃏
                    </div>
                `;
            } else {
                // valto nem joker
                const kartyaHatter = kovetkezo.platform === 'kulso' ? 'kulso.svg' : 'belso.svg';
                kovetkezoHTML = `
                    <img src="source/kartyak/${kartyaHatter}" alt="${kovetkezo.tipus}" style="height: 60px; width: auto; display: block;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                        ${kovetkezo.tipus}
                    </div>
                `;
            }
            
            //valto es kov kartya
            cardDisplay.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 3px; align-items: center; justify-content: center;">
                    <div style="position: relative; display: inline-block;">
                        <img src="source/kartyak/valto.svg" alt="Váltó" style="height: 60px; width: auto; display: block;">
                    </div>
                    <div style="position: relative; display: inline-block;">
                        ${kovetkezoHTML}
                    </div>
                </div>
            `;
            cardDisplay.title = `Váltó (középső peron) + ${kovetkezo.tipus} (${kovetkezo.platform === 'kulso' ? 'külső' : 'középső'} peron)`;
        } else if (kartya.tipus === 'Joker') {
            // joker
            const kartyaHatter = kartya.platform === 'kulso' ? 'kulso.svg' : 'belso.svg';
            cardDisplay.innerHTML = `
                <div style="position: relative; display: inline-block;">
                    <img src="source/kartyak/${kartyaHatter}" alt="Joker" style="height: 120px; width: auto; display: block;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                        🃏
                    </div>
                </div>
            `;
            cardDisplay.title = `Joker (${kartya.platform === 'kulso' ? 'külső' : 'középső'} peron)`;
        } else {
            // nem joker a,b,c,d
            const kartyaHatter = kartya.platform === 'kulso' ? 'kulso.svg' : 'belso.svg';
            cardDisplay.innerHTML = `
                <div style="position: relative; display: inline-block;">
                    <img src="source/kartyak/${kartyaHatter}" alt="${kartya.tipus}" style="height: 120px; width: auto; display: block;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                        ${kartya.tipus}
                    </div>
                </div>
            `;
            cardDisplay.title = `${kartya.tipus} (${kartya.platform === 'kulso' ? 'külső' : 'középső'} peron)`;
        }
        
        document.querySelector('#draw-card-btn').style.display = 'none';
        document.querySelector('#skip-build-btn').disabled = false;
        document.querySelector('#skip-build-btn').style.display = 'inline-block';
    } else {
        cardDisplay.innerHTML = '<span id="card-type" style="font-size: 3rem;">?</span>';
        cardDisplay.title = '';
        document.querySelector('#draw-card-btn').disabled = statusz.pakli.length === 0;
        document.querySelector('#draw-card-btn').style.display = 'inline-block';
        document.querySelector('#skip-build-btn').disabled = true;
        document.querySelector('#skip-build-btn').style.display = 'none';
    }
    
    // updateTimer();
    updateScoring();
    rendervonalak();
}

// ---------------------------------
// idozito frissit
// ---------------------------------
function updateTimer() {
    const eltelt = Date.now() - statusz.ido.kezd;
    const minutes = Math.floor(eltelt / 60000);
    const seconds = Math.floor((eltelt % 60000) / 1000);
    document.querySelector('#timer-display').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

// ---------------------------------
// pontozas megjelenites
// ---------------------------------
function updateScoring() {
    const container = document.querySelector('#scoring-display');
    if (!container) return;
    
    let html = '<div style="font-size: 0.75rem; color: #6c757d; margin-bottom: 0.5rem;">KPxMP + DP = FP </div>';
    
    // fordulo pontok
    const mindenVonal = [0, 1, 2, 3]; //metro id-k
    html += '<div class="score-line" style="grid-template-columns: 30px repeat(5, 1fr);">';
    html += '<div class="score-icon"><img src="source/ikonok/metro_ikon.svg" class="score-icon-img" alt="Metró"></div>';
    
    mindenVonal.forEach(lineIdx => {
        const lineId = statusz.vonalVeletlenSorrend[lineIdx];
        const line = vonalak.find(l => l.id === lineId);
        const roundScore = statusz.korPontok.find(r => r.lineId === lineId);
        
        if (roundScore) {
            const score = roundScore.score;
            html += `<div class="score-cell" style="background: ${line.color}20; border: 2px solid ${line.color};" title="${score.PK}x${score.PM}+${score.PD}">${score.FP}</div>`;
        } else {
            html += `<div class="score-cell" style="background: #e9ecef;">-</div>`;
        }
    });
    html += '</div>';
    
    // aktualis kor stat
    const currentLineId = statusz.vonalVeletlenSorrend[statusz.aktivVonalid];
    const currentRoundScore = calculateRoundPoints(currentLineId);
    
    html += '<div class="score-line" style="grid-template-columns: 30px repeat(4, 1fr);">';
    html += '<div class="score-icon" style="font-size: 1.2rem;">📊</div>';
    html += `<div class="score-cell" title="Kerületek száma">${currentRoundScore.PK} KP</div>`;
    html += `<div class="score-cell" title="Max megálló egy kerületben">${currentRoundScore.PM} MP</div>`;
    html += `<div class="score-cell" title="Duna átlépések">${currentRoundScore.PD} DP</div>`;
    html += `<div class="score-cell" style="background: #667eea20; border: 2px solid #667eea;" title="Jelenlegi kör pontjai">${currentRoundScore.FP} pt</div>`;
    html += '</div>';
    
    // PP - palyaudvar pontok
    const railwayPointsTable = [0, 1, 2, 4, 6, 8, 11, 14, 17, 21, 25];
    const railwayPoints = statusz.vonatCsuszka < railwayPointsTable.length 
        ? railwayPointsTable[statusz.vonatCsuszka] 
        : railwayPointsTable[railwayPointsTable.length - 1];
    
    html += '<div class="score-line" style="grid-template-columns: 30px 1fr auto; align-items: center;">';
    html += '<div class="score-icon"><img src="source/ikonok/vonat_ikon.svg" class="score-icon-img" alt="Vonat"></div>';
    
    // csuszkahoz negyzetek
    html += '<div style="display: flex; gap: 3px; align-items: center;">';
    for (let i = 0; i < 10; i++) {
        const isFilled = i < statusz.vonatCsuszka;
        const fillColor = isFilled ? '#667eea' : '#e9ecef';
        html += `<div style="width: 18px; height: 18px; background: ${fillColor}; border: 1px solid #adb5bd; border-radius: 3px;" title="Érintés ${i + 1}"></div>`;
    }
    html += '</div>';
    
    html += `<div class="score-cell" style="min-width: 50px;">${railwayPoints} pt</div>`;
    html += '</div>';
    
    // csomopont pontok CSP2, CSP3, CSP4
    let kettesCsomopont = 0;
    let harmasCsomopont = 0;
    let negyesCsomopont = 0;
    
    const entries = Object.entries(statusz.elertAllomasok);
    for (let i = 0; i < entries.length; i = i + 1) {
        //const stationId = entries[i][0];
        const vonalakSet = entries[i][1];
        const lineCount = vonalakSet.size;
        
        if (lineCount === 2) {
            kettesCsomopont = kettesCsomopont + 1;
        } else if (lineCount === 3) {
            harmasCsomopont = harmasCsomopont + 1;
        } else if (lineCount >= 4) {
            negyesCsomopont = negyesCsomopont + 1;
        }
    }
    
    const connectionPoints = (kettesCsomopont * 2) + (harmasCsomopont * 5) + (negyesCsomopont * 9);
    
    html += '<div class="score-line" style="grid-template-columns: 30px repeat(3, 1fr) auto;">';
    html += '<div class="score-icon"><img src="source/ikonok/metro_ikon.svg" class="score-icon-img" alt="Csomópontok"></div>';
    html += `<div class="score-cell" title="2 vonal">${kettesCsomopont}x2</div>`;
    html += `<div class="score-cell" title="3 vonal">${harmasCsomopont}x5</div>`;
    html += `<div class="score-cell" title="4 vonal">${negyesCsomopont}x9</div>`;
    html += `<div class="score-cell" style="min-width: 50px;">${connectionPoints} pt</div>`;
    html += '</div>';
    
    // osszesitve
    let totalRoundPoints = 0;
    for (let i = 0; i < statusz.korPontok.length; i = i + 1) {
        totalRoundPoints = totalRoundPoints + statusz.korPontok[i].score.FP;
    }
    const totalPoints = totalRoundPoints + railwayPoints + connectionPoints;
    
    html += `
        <div class="score-total-line">
            <span>Σ Összes pont:</span>
            <span style="margin-left: auto;">${totalPoints}</span>
        </div>
    `;
    
    container.innerHTML = html;
}


// ---------------------------------
// jatek vege oldal
// ---------------------------------
function jatekVegeLap(finalScore) {
    const modal = document.querySelector('#game-over-modal');
    const details = document.querySelector('#final-score-details');
    
    const minutes = Math.floor(statusz.ido.eltelt / 60000);
    const seconds = Math.floor((statusz.ido.eltelt % 60000) / 1000);
    
    let html = `
        <h3>Gratulálok, ${statusz.jatekosNev}!</h3>
        <div class="score-breakdown">
            <div><strong>Fordulók pontjai:</strong></div>
    `;
    
    statusz.korPontok.forEach(round => {
        const line = vonalak.find(l => l.id === round.lineId);
        html += `
            <div style="color: ${line.color};">
                ${line.name}: ${round.score.FP} pont 
                (${round.score.PK}x${round.score.PM}+${round.score.PD})
            </div>
        `;
    });
    
    html += `
            <div><strong>Pályaudvar pontok (PP):</strong> ${finalScore.railwayPoints} </div>
            <div><strong>Csomópont pontok:</strong> ${finalScore.connectionPoints}</div>
            <div style="margin-left: 20px;">
                CSP2: ${finalScore.CSP2} x 2 = ${finalScore.CSP2 * 2}<br>
                CSP3: ${finalScore.CSP3} x 5 = ${finalScore.CSP3 * 5}<br>
                CSP4: ${finalScore.CSP4} x 9 = ${finalScore.CSP4 * 9}
            </div>
            <div class="score-total">Összesen: ${finalScore.total} pont</div>
            <div>Idő: ${minutes}:${seconds.toString().padStart(2, '0')}</div>
        </div>
    `;
    
    details.innerHTML = html;
    modal.classList.add('active');
}

// ---------------------------------
// mentett eredmeny megjelenites
// ---------------------------------
function showResultsModal() {
    const modal = document.querySelector('#results-modal');
    const list = document.querySelector('#results-list');
    
    const results = loadResults();
    
    if (results.length === 0) {
        list.innerHTML = '<div class="no-results">Még nincsenek mentett eredmények.</div>';
    } else {
        let html = `
            <table class="results-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Név</th>
                        <th>Pont</th>
                        <th>Idő</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        results.forEach((result, index) => {
            const minutes = Math.floor(result.time / 60000);
            const seconds = Math.floor((result.time % 60000) / 1000);
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${result.name}</td>
                    <td>${result.points}</td>
                    <td>${minutes}:${seconds.toString().padStart(2, '0')}</td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
        list.innerHTML = html;
    }
    
    modal.classList.add('active');
}
//#endregion

//#region jatek inditas
// ---------------------------------
// jatek inditas
// ---------------------------------
function startGame(jatekosNev) {
    if (!jatekosNev.trim()) {
        return;
    }
    
    initstate(jatekosNev);
    statusz.pakli = initDeck();
    
    document.querySelector('#menu-screen').classList.remove('active');
    document.querySelector('#game-screen').classList.add('active');
    
    renderGrid();
    updateUI();
    
    // ido frissit
    setInterval(() => {
        if (statusz && statusz.aktivVonalid < statusz.vonalVeletlenSorrend.length) {
            updateTimer();
        }
    }, 1000);
}
//#endregion

//#region menu vissza
// ---------------------------------
// menu vissza
// ---------------------------------
function returnToMenu() {
    statusz = null;
    document.querySelector('#game-screen').classList.remove('active');
    document.querySelector('#menu-screen').classList.add('active');
    document.querySelector('#player-name').value = '';
}
//#endregion

//#region kattintas kezelok 
// init
async function init() {
    await loadData();
    
    // start gomb
    document.querySelector('#start-button').addEventListener('click', () => {
        const jatekosNev = document.querySelector('#player-name').value;
        startGame(jatekosNev);
    });
    
    // eredmeny gomb
    document.querySelector('#results-button').addEventListener('click', () => {
        showResultsModal();
    });
    
    // szabaly gomb
    document.querySelector('#rules-button').addEventListener('click', () => {
        document.querySelector('#rules-modal').classList.add('active');
    });
    
    // vissza menu gomb
    document.querySelector('#back-to-menu').addEventListener('click', () => {
        if (confirm('Biztosan vissza akarsz menni a menübe? A játék nem lesz mentve!')) {
            returnToMenu();
        }
    });
    
    document.querySelector('#back-to-menu-final').addEventListener('click', () => {
        document.querySelector('#game-over-modal').classList.remove('active');
        returnToMenu();
    });
    
    // kartya huz
    document.querySelector('#draw-card-btn').addEventListener('click', () => {
        const kartya = drawCard();
        if (kartya) {
            updateUI();
            highlightEndpoints();
        }
    });
    
    // epit skip
    document.querySelector('#skip-build-btn').addEventListener('click', () => {
        statusz.kivalasztottKartya = null;
        statusz.kivalasztottAllomas = null;
        statusz.valtoAktiv = false;
        checkRoundEnd();
        updateUI();
        highlightEndpoints();
    });
    
    // modal bezar
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').classList.remove('active');
        });
    });
    
    //// modal felrenyom
    //document.querySelectorAll('.modal').forEach(modal => {
    //    modal.addEventListener('click', (e) => {
    //        if (e.target === modal) {
    //            modal.classList.remove('active');
    //        }
    //    });
    //});
    
    // nev bevital enter
    document.querySelector('#player-name').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const jatekosNev = document.querySelector('#player-name').value;
            startGame(jatekosNev);
        }
    });
}
//#endregion


// vegre xd
init();