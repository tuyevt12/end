// ============================================================
// MAP LAYER CONTROL - QUẢN LÝ LỚP BẢN ĐỒ
// ============================================================

class MapLayerControl {
    constructor(mapId) {
        this.mapId = mapId;
        this.map = null;
        this.layers = {};
        this.layerGroups = {};
        this.isInitialized = false;
    }

    init(map) {
        this.map = map;
        this.isInitialized = true;
        
        this.layerGroups = {
            warehouses: L.layerGroup().addTo(this.map),
            reliefPoints: L.layerGroup().addTo(this.map),
            shelters: L.layerGroup().addTo(this.map),
            dangerZones: L.layerGroup().addTo(this.map),
            tasks: L.layerGroup().addTo(this.map),
            reports: L.layerGroup().addTo(this.map),
            residents: L.layerGroup().addTo(this.map),
            routes: L.layerGroup().addTo(this.map)
        };
        
        this.layers = {
            warehouses: true,
            reliefPoints: true,
            shelters: true,
            dangerZones: true,
            tasks: true,
            reports: true,
            residents: true,
            routes: true
        };
        
        return this;
    }

    addToLayer(layerName, marker) {
        if (!this.layerGroups[layerName]) {
            this.layerGroups[layerName] = L.layerGroup().addTo(this.map);
            this.layers[layerName] = true;
        }
        marker.addTo(this.layerGroups[layerName]);
        return this;
    }

    toggleLayer(layerName) {
        if (!this.layerGroups[layerName]) return false;
        if (this.layers[layerName]) {
            this.map.removeLayer(this.layerGroups[layerName]);
            this.layers[layerName] = false;
        } else {
            this.layerGroups[layerName].addTo(this.map);
            this.layers[layerName] = true;
        }
        this.updateUIStatus();
        return this.layers[layerName];
    }

    toggleAll(visible) {
        Object.keys(this.layerGroups).forEach(key => {
            if (visible) {
                this.layerGroups[key].addTo(this.map);
                this.layers[key] = true;
            } else {
                this.map.removeLayer(this.layerGroups[key]);
                this.layers[key] = false;
            }
        });
        this.updateUIStatus();
        return this;
    }

    clearLayer(layerName) {
        if (this.layerGroups[layerName]) {
            this.layerGroups[layerName].clearLayers();
        }
        return this;
    }

    clearAll() {
        Object.keys(this.layerGroups).forEach(key => this.clearLayer(key));
        return this;
    }

    getLayerStatus(layerName) {
        return this.layers[layerName] || false;
    }

    getAllStatus() {
        return { ...this.layers };
    }

    createMarker(lat, lng, type, popupContent) {
        const configs = {
            warehouse: { className: 'custom-marker-blue', html: '<i class="fa-solid fa-warehouse"></i>', size: [32, 32], anchor: [16, 16] },
            relief: { className: 'custom-marker-green', html: '<i class="fa-solid fa-hand-holding-heart"></i>', size: [28, 28], anchor: [14, 14] },
            shelter: { className: 'shelter-marker', html: '<i class="fa-solid fa-house"></i>', size: [30, 30], anchor: [15, 15] },
            danger: { className: 'danger-marker', html: '<i class="fa-solid fa-triangle-exclamation"></i>', size: [30, 30], anchor: [15, 15] },
            task: { className: 'task-marker', html: '<i class="fa-solid fa-flag-checkered"></i>', size: [32, 32], anchor: [16, 16] },
            report: { className: 'report-marker', html: '<i class="fa-solid fa-flag"></i>', size: [28, 28], anchor: [14, 14] },
            resident: { className: 'user-marker', html: '<i class="fa-solid fa-user"></i>', size: [36, 36], anchor: [18, 18] }
        };

        const config = configs[type] || configs.warehouse;
        const marker = L.marker([lat, lng], {
            icon: L.divIcon({
                className: config.className,
                html: config.html,
                iconSize: config.size,
                iconAnchor: config.anchor
            })
        });
        if (popupContent) marker.bindPopup(popupContent);
        return marker;
    }

    createControlUI(containerId) {
        const container = document.getElementById(containerId);
        if (!container) { 
            console.error(`❌ Container #${containerId} not found`); 
            return this; 
        }

        const layerConfigs = {
            warehouses: { label: '🏢 Kho hàng', icon: 'fa-solid fa-warehouse', color: '#3b82f6' },
            reliefPoints: { label: '🏥 Điểm cứu trợ', icon: 'fa-solid fa-hand-holding-heart', color: '#22c55e' },
            shelters: { label: '🏠 Nhà lắp ghép', icon: 'fa-solid fa-house', color: '#f59e0b' },
            dangerZones: { label: '⚠️ Vùng nguy cơ', icon: 'fa-solid fa-triangle-exclamation', color: '#ef4444' },
            tasks: { label: '📋 Nhiệm vụ', icon: 'fa-solid fa-tasks', color: '#8b5cf6' },
            reports: { label: '📌 Báo cáo', icon: 'fa-solid fa-flag', color: '#ec4899' },
            residents: { label: '👤 Người dân', icon: 'fa-solid fa-user', color: '#14b8a6' },
            routes: { label: '🛣️ Tuyến đường', icon: 'fa-solid fa-route', color: '#f59e0b' }
        };

        container.innerHTML = `
            <div class="layer-control-container">
                <div class="layer-control-header">
                    <span class="text-xs font-bold text-slate-700"><i class="fa-solid fa-layer-group mr-1"></i> Lớp bản đồ</span>
                    <div class="flex gap-1">
                        <button onclick="window.toggleAllLayers && window.toggleAllLayers(true)" class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded hover:bg-blue-100 transition">Hiện</button>
                        <button onclick="window.toggleAllLayers && window.toggleAllLayers(false)" class="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded hover:bg-slate-100 transition">Ẩn</button>
                    </div>
                </div>
                <div class="layer-control-body">
                    ${Object.entries(layerConfigs).map(([key, config]) => `
                        <label class="layer-control-item" style="border-left-color: ${config.color}">
                            <input type="checkbox" id="layer-${key}" checked 
                                   onchange="window.toggleLayer && window.toggleLayer('${key}')" />
                            <span class="layer-control-label">
                                <i class="${config.icon}" style="color: ${config.color}"></i>
                                ${config.label}
                            </span>
                            <span class="layer-control-status" id="layer-status-${key}">●</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;

        const styleId = 'layer-control-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .layer-control-container {
                    background: white;
                    border-radius: 8px;
                    padding: 8px 10px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    min-width: 180px;
                    border: 1px solid #e9edf2;
                    font-size: 11px;
                }
                .layer-control-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 6px;
                    border-bottom: 1px solid #f1f5f9;
                    margin-bottom: 6px;
                }
                .layer-control-body {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }
                .layer-control-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11px;
                    padding: 3px 6px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: 0.2s;
                    border-left: 3px solid transparent;
                }
                .layer-control-item:hover { background: #f8fafc; }
                .layer-control-item input[type="checkbox"] {
                    width: 14px;
                    height: 14px;
                    cursor: pointer;
                    accent-color: #3b82f6;
                }
                .layer-control-label {
                    flex: 1;
                    color: #1e293b;
                    font-weight: 500;
                    font-size: 11px;
                }
                .layer-control-label i {
                    width: 16px;
                    text-align: center;
                    margin-right: 4px;
                    font-size: 12px;
                }
                .layer-control-status {
                    font-size: 10px;
                    color: #22c55e;
                    transition: 0.2s;
                }
                .layer-control-status.hidden { color: #94a3b8; }
                @media (max-width: 768px) {
                    .layer-control-container { min-width: 140px; font-size: 10px; }
                    .layer-control-item { font-size: 10px; padding: 2px 4px; }
                }
            `;
            document.head.appendChild(style);
        }

        this.updateUIStatus();
        return this;
    }

    updateUIStatus() {
        Object.keys(this.layers).forEach(key => {
            const statusEl = document.getElementById(`layer-status-${key}`);
            if (statusEl) {
                statusEl.className = `layer-control-status${this.layers[key] ? '' : ' hidden'}`;
                statusEl.textContent = this.layers[key] ? '●' : '○';
            }
        });
        return this;
    }
}

// ============================================================
// GLOBAL
// ============================================================
const mapLayerControls = {};

function createLayerControl(mapId, map) {
    const control = new MapLayerControl(mapId);
    control.init(map);
    mapLayerControls[mapId] = control;
    return control;
}

function getLayerControl(mapId) {
    return mapLayerControls[mapId] || null;
}

function toggleLayer(layerName) {
    for (let key in mapLayerControls) {
        const control = mapLayerControls[key];
        if (control.layers[layerName] !== undefined) {
            control.toggleLayer(layerName);
            break;
        }
    }
}

function toggleAllLayers(visible) {
    for (let key in mapLayerControls) {
        mapLayerControls[key].toggleAll(visible);
    }
}

window.MapLayerControl = MapLayerControl;
window.createLayerControl = createLayerControl;
window.getLayerControl = getLayerControl;
window.toggleLayer = toggleLayer;
window.toggleAllLayers = toggleAllLayers;

console.log('✅ Map Layer Control loaded');