// ============================================================
// APPDATA - DATASTORE TẬP TRUNG
// ============================================================

const AppData = {
    // ============================================================
    // KEYS CHUẨN
    // ============================================================
    KEYS: {
        RESIDENTS: 'hlms_residents',
        REQUESTS: 'hlms_requests',
        VOLUNTEERS: 'hlms_volunteers',
        MISSIONS: 'hlms_missions',
        INVENTORY: 'hlms_inventory',
        WAREHOUSES: 'hlms_warehouses',
        SUPPLIERS: 'hlms_suppliers',
        DISTRIBUTIONS: 'hlms_distributions',
        REPORTS: 'hlms_reports',
        SIMULATIONS: 'hlms_simulations',
        SETTINGS: 'hlms_settings',
        USER: 'hlms_user',
        STATS: 'hlms_stats',
        NOTIFICATIONS: 'hlms_notifications',
        SIGNALS: 'hlms_signals'
    },

    // ============================================================
    // CORE METHODS
    // ============================================================
    get(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            if (data) return JSON.parse(data);
            return defaultValue;
        } catch (e) {
            console.error(`❌ Lỗi đọc ${key}:`, e);
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            this.notifyChange(key, value);
            return true;
        } catch (e) {
            console.error(`❌ Lỗi ghi ${key}:`, e);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            this.notifyChange(key, null);
            return true;
        } catch (e) {
            console.error(`❌ Lỗi xóa ${key}:`, e);
            return false;
        }
    },

    notifyChange(key, value) {
        window.dispatchEvent(new CustomEvent('dataChanged', {
            detail: { key, value }
        }));
        console.log(`📦 Data changed: ${key}`);
    },

    // ============================================================
    // EXPORT/IMPORT
    // ============================================================
    exportAll() {
        const data = {};
        for (let key in this.KEYS) {
            const storageKey = this.KEYS[key];
            const shortKey = key.toLowerCase();
            data[shortKey] = this.get(storageKey, []);
        }
        data.inventory_history = this.getInventoryHistory();
        return {
            version: '2.0',
            exportedAt: new Date().toISOString(),
            system: 'HLMS - Humanitarian Logistics Management System',
            data: data
        };
    },

    importAll(importData) {
        if (!importData.data) return false;
        for (let key in importData.data) {
            const storageKey = this.KEYS[key.toUpperCase()];
            if (storageKey) {
                this.set(storageKey, importData.data[key]);
            }
        }
        if (importData.data.inventory_history) {
            this.setInventoryHistory(importData.data.inventory_history);
        }
        return true;
    },

    // ============================================================
    // REQUEST METHODS - YÊU CẦU CỨU TRỢ
    // ============================================================
    getRequests() { return this.get(this.KEYS.REQUESTS, []); },
    setRequests(data) { this.set(this.KEYS.REQUESTS, data); },
    
    addRequest(request) {
        const requests = this.getRequests();
        request.id = request.id || 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        request.code = request.code || 'YC' + String(requests.length + 1).padStart(4, '0');
        request.status = request.status || 'pending';
        request.createdAt = request.createdAt || new Date().toISOString();
        request.tracking = request.tracking || [];
        requests.unshift(request);
        this.setRequests(requests);
        
        this.addNotification({
            title: `📢 Yêu cầu cứu trợ mới: ${request.name}`,
            detail: `${request.xa || ''}, ${request.huyen || ''}, ${request.tinh || ''}`,
            type: 'request'
        });
        this.addSignal(`📢 Yêu cầu cứu trợ mới từ ${request.name}`, 'info');
        return request;
    },

    updateRequest(id, updates) {
        const requests = this.getRequests();
        const index = requests.findIndex(r => r.id === id);
        if (index !== -1) {
            requests[index] = { ...requests[index], ...updates, updatedAt: new Date().toISOString() };
            if (updates.status) {
                requests[index].tracking = requests[index].tracking || [];
                requests[index].tracking.push({
                    status: updates.status,
                    time: new Date().toISOString(),
                    note: updates.note || ''
                });
            }
            this.setRequests(requests);
            return requests[index];
        }
        return null;
    },

    deleteRequest(id) {
        let requests = this.getRequests();
        requests = requests.filter(r => r.id !== id);
        this.setRequests(requests);
        return true;
    },

    // ============================================================
    // RESIDENT METHODS - QUẢN LÝ ĐỐI TƯỢNG THỤ HƯỞNG
    // ============================================================
    getResidents() { return this.get(this.KEYS.RESIDENTS, []); },
    setResidents(data) { this.set(this.KEYS.RESIDENTS, data); },
    
    addResident(resident) {
        const residents = this.getResidents();
        resident.id = resident.id || 'res_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        resident.code = resident.code || 'DN' + String(residents.length + 1).padStart(4, '0');
        resident.createdAt = resident.createdAt || new Date().toISOString();
        resident.status = resident.status || 'Đang chờ';
        residents.unshift(resident);
        this.setResidents(residents);
        this.addSignal(`👤 Thêm người dân: ${resident.name}`, 'info');
        return resident;
    },

    updateResident(id, updates) {
        const residents = this.getResidents();
        const index = residents.findIndex(r => r.id === id);
        if (index !== -1) {
            residents[index] = { ...residents[index], ...updates, updatedAt: new Date().toISOString() };
            this.setResidents(residents);
            return residents[index];
        }
        return null;
    },

    deleteResident(id) {
        let residents = this.getResidents();
        residents = residents.filter(r => r.id !== id);
        this.setResidents(residents);
        return true;
    },

    // ============================================================
    // REPORT METHODS - BÁO CÁO CỘNG ĐỒNG
    // ============================================================
    getReports() { return this.get(this.KEYS.REPORTS, []); },
    setReports(data) { this.set(this.KEYS.REPORTS, data); },
    
    addReport(report) {
        const reports = this.getReports();
        report.id = report.id || 'rpt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        report.code = report.code || 'BC' + String(reports.length + 1).padStart(4, '0');
        report.status = report.status || 'pending';
        report.createdAt = report.createdAt || new Date().toISOString();
        reports.unshift(report);
        this.setReports(reports);
        
        this.addNotification({
            title: `📌 Báo cáo cộng đồng mới: ${report.title}`,
            detail: report.location || 'Đang cập nhật',
            type: 'report'
        });
        this.addSignal(`📌 Báo cáo cộng đồng mới: ${report.title}`, 'info');
        return report;
    },

    updateReport(id, updates) {
        const reports = this.getReports();
        const index = reports.findIndex(r => r.id === id);
        if (index !== -1) {
            reports[index] = { ...reports[index], ...updates, updatedAt: new Date().toISOString() };
            this.setReports(reports);
            return reports[index];
        }
        return null;
    },

    deleteReport(id) {
        let reports = this.getReports();
        reports = reports.filter(r => r.id !== id);
        this.setReports(reports);
        return true;
    },

    // ============================================================
    // VOLUNTEER METHODS - TÌNH NGUYỆN VIÊN
    // ============================================================
    getVolunteers() { return this.get(this.KEYS.VOLUNTEERS, []); },
    setVolunteers(data) { this.set(this.KEYS.VOLUNTEERS, data); },
    
    addVolunteer(volunteer) {
        const volunteers = this.getVolunteers();
        volunteer.id = volunteer.id || 'vol_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        volunteer.code = volunteer.code || 'TNV' + String(volunteers.length + 1).padStart(3, '0');
        volunteer.createdAt = volunteer.createdAt || new Date().toISOString();
        volunteer.status = volunteer.status || 'active';
        volunteer.skills = volunteer.skills || ['Vận chuyển'];
        volunteers.unshift(volunteer);
        this.setVolunteers(volunteers);
        this.addSignal(`🧑‍🤝‍🧑 Thêm tình nguyện viên: ${volunteer.name}`, 'info');
        return volunteer;
    },

    updateVolunteer(id, updates) {
        const volunteers = this.getVolunteers();
        const index = volunteers.findIndex(v => v.id === id);
        if (index !== -1) {
            volunteers[index] = { ...volunteers[index], ...updates, updatedAt: new Date().toISOString() };
            this.setVolunteers(volunteers);
            return volunteers[index];
        }
        return null;
    },

    deleteVolunteer(id) {
        let volunteers = this.getVolunteers();
        volunteers = volunteers.filter(v => v.id !== id);
        this.setVolunteers(volunteers);
        return true;
    },

    // ============================================================
    // MISSION METHODS - NHIỆM VỤ (CÓ DELETE)
    // ============================================================
    getMissions() { return this.get(this.KEYS.MISSIONS, []); },
    setMissions(data) { this.set(this.KEYS.MISSIONS, data); },
    
    addMission(mission) {
        const missions = this.getMissions();
        mission.id = mission.id || 'msn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        mission.code = mission.code || 'NV' + String(missions.length + 1).padStart(4, '0');
        mission.createdAt = mission.createdAt || new Date().toISOString();
        mission.status = mission.status || 'pending';
        mission.volunteers = mission.volunteers || [];
        mission.requiredVolunteers = mission.requiredVolunteers || 2;
        missions.unshift(mission);
        this.setMissions(missions);
        this.addSignal(`📋 Tạo nhiệm vụ mới: ${mission.title}`, 'info');
        return mission;
    },

    updateMission(id, updates) {
        const missions = this.getMissions();
        const index = missions.findIndex(m => m.id === id);
        if (index !== -1) {
            missions[index] = { ...missions[index], ...updates, updatedAt: new Date().toISOString() };
            this.setMissions(missions);
            return missions[index];
        }
        return null;
    },

    deleteMission(id) {
        let missions = this.getMissions();
        const index = missions.findIndex(m => m.id === id);
        if (index !== -1) {
            if (missions[index].volunteers && missions[index].volunteers.length > 0) {
                this.addNotification({
                    title: `🗑️ Nhiệm vụ "${missions[index].title}" đã bị hủy`,
                    detail: `${missions[index].volunteers.length} tình nguyện viên đã tham gia`,
                    type: 'mission_cancelled'
                });
            }
            missions = missions.filter(m => m.id !== id);
            this.setMissions(missions);
            this.addSignal(`🗑️ Đã xóa nhiệm vụ`, 'warning');
            return true;
        }
        return false;
    },

    getMissionsByVolunteer(volunteerName) {
        const missions = this.getMissions();
        return missions.filter(m => 
            m.volunteers && m.volunteers.some(v => v.name === volunteerName)
        );
    },

    getAvailableMissions() {
        const missions = this.getMissions();
        return missions.filter(m => {
            const volunteerCount = m.volunteers?.length || 0;
            const required = m.requiredVolunteers || 2;
            return m.status === 'pending' && volunteerCount < required;
        });
    },

    // ============================================================
    // WAREHOUSE METHODS - QUẢN LÝ KHO
    // ============================================================
    getWarehouses() { return this.get(this.KEYS.WAREHOUSES, []); },
    setWarehouses(data) { this.set(this.KEYS.WAREHOUSES, data); },
    
    addWarehouse(warehouse) {
        const warehouses = this.getWarehouses();
        warehouse.id = warehouse.id || 'wh_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        warehouse.code = warehouse.code || 'K' + String(warehouses.length + 1).padStart(3, '0');
        warehouse.createdAt = warehouse.createdAt || new Date().toISOString();
        warehouse.status = warehouse.status || 'active';
        warehouses.unshift(warehouse);
        this.setWarehouses(warehouses);
        this.addSignal(`🏢 Thêm kho: ${warehouse.name}`, 'info');
        return warehouse;
    },

    updateWarehouse(id, updates) {
        const warehouses = this.getWarehouses();
        const index = warehouses.findIndex(w => w.id === id);
        if (index !== -1) {
            warehouses[index] = { ...warehouses[index], ...updates, updatedAt: new Date().toISOString() };
            this.setWarehouses(warehouses);
            return warehouses[index];
        }
        return null;
    },

    deleteWarehouse(id) {
        let warehouses = this.getWarehouses();
        warehouses = warehouses.filter(w => w.id !== id);
        this.setWarehouses(warehouses);
        return true;
    },

    // ============================================================
    // INVENTORY METHODS - QUẢN LÝ TỒN KHO
    // ============================================================
    getInventory() { return this.get(this.KEYS.INVENTORY, []); },
    setInventory(data) { this.set(this.KEYS.INVENTORY, data); },

    addInventoryItem(item) {
        const items = this.getInventory();
        item.id = item.id || 'inv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        item.createdAt = item.createdAt || new Date().toISOString();
        items.unshift(item);
        this.setInventory(items);
        return item;
    },

    updateInventoryItem(id, updates) {
        const items = this.getInventory();
        const index = items.findIndex(i => i.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
            this.setInventory(items);
            return items[index];
        }
        return null;
    },

    deleteInventoryItem(id) {
        let items = this.getInventory();
        items = items.filter(i => i.id !== id);
        this.setInventory(items);
        return true;
    },

    getStockByWarehouseAndType(warehouseId, shelterType) {
        const items = this.getInventory();
        const matched = items.filter(i => i.warehouseId === warehouseId && i.name === shelterType);
        return matched.reduce((sum, i) => sum + (i.quantity || 0), 0);
    },

    getStockByWarehouse(warehouseId) {
        const items = this.getInventory();
        const matched = items.filter(i => i.warehouseId === warehouseId);
        return matched.reduce((sum, i) => sum + (i.quantity || 0), 0);
    },

    updateStock(warehouseId, shelterType, quantity, operation = 'add') {
        const items = this.getInventory();
        let existing = items.find(i => i.warehouseId === warehouseId && i.name === shelterType);
        
        if (existing) {
            if (operation === 'add') {
                existing.quantity += quantity;
            } else if (operation === 'subtract') {
                existing.quantity -= quantity;
                if (existing.quantity < 0) existing.quantity = 0;
            }
            existing.updatedAt = new Date().toISOString();
            this.setInventory(items);
            return existing;
        } else if (operation === 'add') {
            const newItem = {
                id: 'inv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
                warehouseId: warehouseId,
                name: shelterType,
                quantity: quantity,
                min: 30,
                safetyStock: 20,
                createdAt: new Date().toISOString()
            };
            items.push(newItem);
            this.setInventory(items);
            return newItem;
        }
        return null;
    },

    // ============================================================
    // INVENTORY HISTORY
    // ============================================================
    getInventoryHistory() { return this.get('inventory_history', []); },
    setInventoryHistory(data) { this.set('inventory_history', data); },

    addInventoryHistory(entry) {
        const history = this.getInventoryHistory();
        entry.id = entry.id || 'PN' + String(history.length + 1).padStart(4, '0');
        entry.createdAt = entry.createdAt || new Date().toISOString();
        history.unshift(entry);
        this.setInventoryHistory(history);
        
        if (entry.type === 'import') {
            this.updateStock(entry.warehouseId, entry.name, entry.quantity, 'add');
        } else if (entry.type === 'export') {
            this.updateStock(entry.warehouseId, entry.name, entry.quantity, 'subtract');
        }
        
        this.notifyChange('inventory_history', history);
        return entry;
    },

    deleteInventoryHistory(id) {
        let history = this.getInventoryHistory();
        const entry = history.find(e => e.id === id);
        if (!entry) return false;
        
        if (entry.type === 'import') {
            this.updateStock(entry.warehouseId, entry.name, entry.quantity, 'subtract');
        } else if (entry.type === 'export') {
            this.updateStock(entry.warehouseId, entry.name, entry.quantity, 'add');
        }
        
        history = history.filter(e => e.id !== id);
        this.setInventoryHistory(history);
        this.notifyChange('inventory_history', history);
        return true;
    },

    // ============================================================
    // SUPPLIER METHODS
    // ============================================================
    getSuppliers() { return this.get(this.KEYS.SUPPLIERS, []); },
    setSuppliers(data) { this.set(this.KEYS.SUPPLIERS, data); },
    
    addSupplier(supplier) {
        const suppliers = this.getSuppliers();
        supplier.id = supplier.id || 'sup_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        supplier.code = supplier.code || 'NCC' + String(suppliers.length + 1).padStart(3, '0');
        supplier.createdAt = supplier.createdAt || new Date().toISOString();
        supplier.status = supplier.status || 'inactive';
        suppliers.unshift(supplier);
        this.setSuppliers(suppliers);
        this.addSignal(`🤝 Thêm nhà cung cấp: ${supplier.name}`, 'info');
        return supplier;
    },

    updateSupplier(id, updates) {
        const suppliers = this.getSuppliers();
        const index = suppliers.findIndex(s => s.id === id);
        if (index !== -1) {
            suppliers[index] = { ...suppliers[index], ...updates, updatedAt: new Date().toISOString() };
            this.setSuppliers(suppliers);
            return suppliers[index];
        }
        return null;
    },

    deleteSupplier(id) {
        let suppliers = this.getSuppliers();
        suppliers = suppliers.filter(s => s.id !== id);
        this.setSuppliers(suppliers);
        return true;
    },

    activateSupplier(id) {
        const suppliers = this.getSuppliers();
        const index = suppliers.findIndex(s => s.id === id);
        if (index !== -1) {
            suppliers[index].status = 'active';
            suppliers[index].activatedAt = new Date().toISOString();
            this.setSuppliers(suppliers);
            this.addSignal(`✅ Kích hoạt nhà cung cấp: ${suppliers[index].name}`, 'success');
            return suppliers[index];
        }
        return null;
    },

    // ============================================================
    // DISTRIBUTION METHODS
    // ============================================================
    getDistributions() { return this.get(this.KEYS.DISTRIBUTIONS, []); },
    setDistributions(data) { this.set(this.KEYS.DISTRIBUTIONS, data); },
    
    addDistribution(distribution) {
        const distributions = this.getDistributions();
        distribution.id = distribution.id || 'dist_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        distribution.code = distribution.code || 'DC' + String(distributions.length + 1).padStart(4, '0');
        distribution.createdAt = distribution.createdAt || new Date().toISOString();
        distribution.status = distribution.status || 'planning';
        distributions.unshift(distribution);
        this.setDistributions(distributions);
        this.addSignal(`🚚 Tạo phương án cứu trợ: ${distribution.code}`, 'info');
        return distribution;
    },

    updateDistribution(id, updates) {
        const distributions = this.getDistributions();
        const index = distributions.findIndex(d => d.id === id);
        if (index !== -1) {
            distributions[index] = { ...distributions[index], ...updates, updatedAt: new Date().toISOString() };
            this.setDistributions(distributions);
            return distributions[index];
        }
        return null;
    },

    deleteDistribution(id) {
        let distributions = this.getDistributions();
        distributions = distributions.filter(d => d.id !== id);
        this.setDistributions(distributions);
        return true;
    },

    // ============================================================
    // NOTIFICATION METHODS
    // ============================================================
    getNotifications() { return this.get(this.KEYS.NOTIFICATIONS, []); },
    setNotifications(data) { this.set(this.KEYS.NOTIFICATIONS, data); },
    
    addNotification(notification) {
        const notifications = this.getNotifications();
        notification.id = notification.id || 'noti_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        notification.read = notification.read || false;
        notification.time = notification.time || new Date().toLocaleString('vi-VN');
        notification.createdAt = notification.createdAt || new Date().toISOString();
        notifications.unshift(notification);
        if (notifications.length > 100) notifications.length = 100;
        this.setNotifications(notifications);
        return notification;
    },

    markNotificationRead(id) {
        const notifications = this.getNotifications();
        const index = notifications.findIndex(n => n.id === id);
        if (index !== -1) {
            notifications[index].read = true;
            this.setNotifications(notifications);
            return true;
        }
        return false;
    },

    // ============================================================
    // SIGNAL METHODS
    // ============================================================
    getSignals() { return this.get(this.KEYS.SIGNALS, []); },
    setSignals(data) { this.set(this.KEYS.SIGNALS, data); },
    addSignal(message, type = 'info') {
        const signals = this.getSignals();
        signals.unshift({
            id: 'sig_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
            time: new Date().toLocaleString('vi-VN'),
            message: message,
            type: type
        });
        if (signals.length > 200) signals.length = 200;
        this.setSignals(signals);
        return signals[0];
    },

    // ============================================================
    // STATS
    // ============================================================
    getStats() {
        return this.get(this.KEYS.STATS, {
            totalRequests: 0,
            pendingRequests: 0,
            processingRequests: 0,
            completedRequests: 0,
            totalShelter: 0,
            deliveredShelter: 0,
            activeVolunteers: 0,
            responseTime: 0,
            fulfillmentRate: 0
        });
    },
    setStats(data) { this.set(this.KEYS.STATS, data); },
    updateStats(updates) {
        const stats = this.getStats();
        const newStats = { ...stats, ...updates };
        this.setStats(newStats);
        return newStats;
    },

    // ============================================================
    // USER
    // ============================================================
    getUser() { return this.get(this.KEYS.USER, null); },
    setUser(user) { this.set(this.KEYS.USER, user); },
    isLoggedIn() { return this.getUser() !== null; },
    
    logout() {
        console.log('🚪 Đang đăng xuất...');
        this.remove(this.KEYS.USER);
        localStorage.removeItem('hlms_admin_module');
        window.location.href = 'login.html';
    },

    // ============================================================
    // SETTINGS
    // ============================================================
    getSettings() {
        return this.get(this.KEYS.SETTINGS, {
            displayName: 'Admin',
            email: 'admin@hlms.gov.vn',
            minStock: 50,
            maxStock: 200,
            safetyStock: 30,
            responseTimeTarget: 24,
            serviceRadius: 50
        });
    },
    setSettings(data) { this.set(this.KEYS.SETTINGS, data); },

    // ============================================================
    // SEED DATA - VỚI ĐỊA CHỈ THỰC TẾ
    // ============================================================
    seedData() {
        console.log('🌱 HLMS: Bắt đầu seed data với địa chỉ thực tế...');

        // ===== MISSIONS - NHIỆM VỤ VỚI ĐỊA CHỈ THỰC TẾ =====
        if (this.getMissions().length === 0) {
            const sampleMissions = [
                {
                    id: 'msn_1',
                    code: 'NV0001',
                    title: '🚚 Vận chuyển 50 shelter đến Quảng Nam',
                    description: 'Vận chuyển 50 bộ shelter đến xã Bình Mỹ, Điện Bàn, Quảng Nam',
                    from: 'Kho Đà Nẵng',
                    to: 'Xã Bình Mỹ, Điện Bàn, Quảng Nam',
                    toLat: 15.8439,
                    toLng: 108.1829,
                    pickupName: 'Điểm tập kết Đà Nẵng',
                    pickupLat: 16.0544,
                    pickupLng: 108.2022,
                    qty: 50,
                    requiredVolunteers: 3,
                    priority: 'high',
                    deadline: '2026-07-15',
                    status: 'pending',
                    volunteers: [],
                    createdAt: new Date(Date.now() - 7200000).toISOString()
                },
                {
                    id: 'msn_2',
                    code: 'NV0002',
                    title: '🏠 Lắp đặt nhà lắp ghép tại Huế',
                    description: 'Lắp đặt 20 bộ nhà lắp ghép tại xã Vĩnh Hậu, Phú Vang, Thừa Thiên Huế',
                    from: 'Kho Huế',
                    to: 'Xã Vĩnh Hậu, Phú Vang, Thừa Thiên Huế',
                    toLat: 16.4439,
                    toLng: 107.7029,
                    pickupName: 'Điểm tập kết Huế',
                    pickupLat: 16.4630,
                    pickupLng: 107.5900,
                    qty: 20,
                    requiredVolunteers: 2,
                    priority: 'normal',
                    deadline: '2026-07-20',
                    status: 'pending',
                    volunteers: [],
                    createdAt: new Date(Date.now() - 3600000).toISOString()
                },
                {
                    id: 'msn_3',
                    code: 'NV0003',
                    title: '🚚 Vận chuyển hàng cứu trợ đến Quảng Bình',
                    description: 'Vận chuyển 100 bộ nhu yếu phẩm đến xã Bình Thạnh, Bố Trạch, Quảng Bình',
                    from: 'Kho Đồng Hới',
                    to: 'Xã Bình Thạnh, Bố Trạch, Quảng Bình',
                    toLat: 17.4989,
                    toLng: 106.3859,
                    pickupName: 'Điểm tập kết Đồng Hới',
                    pickupLat: 17.4690,
                    pickupLng: 106.5970,
                    qty: 100,
                    requiredVolunteers: 4,
                    priority: 'high',
                    deadline: '2026-07-10',
                    status: 'active',
                    volunteers: [
                        { name: 'Tình nguyện viên', joinedAt: new Date(Date.now() - 3600000 * 2).toISOString() },
                        { name: 'Nguyễn Văn A', joinedAt: new Date(Date.now() - 3600000).toISOString() }
                    ],
                    createdAt: new Date(Date.now() - 86400000).toISOString()
                },
                {
                    id: 'msn_4',
                    code: 'NV0004',
                    title: '📦 Phân phát nhu yếu phẩm tại Đà Nẵng',
                    description: 'Phân phát 200 bộ nhu yếu phẩm cho người dân tại quận Ngũ Hành Sơn, Đà Nẵng',
                    from: 'Kho Đà Nẵng',
                    to: 'Quận Ngũ Hành Sơn, Đà Nẵng',
                    toLat: 16.0289,
                    toLng: 108.2589,
                    pickupName: 'Điểm tập kết Đà Nẵng',
                    pickupLat: 16.0544,
                    pickupLng: 108.2022,
                    qty: 200,
                    requiredVolunteers: 3,
                    priority: 'normal',
                    deadline: '2026-07-25',
                    status: 'pending',
                    volunteers: [],
                    createdAt: new Date(Date.now() - 10800000).toISOString()
                },
                {
                    id: 'msn_5',
                    code: 'NV0005',
                    title: '🏥 Hỗ trợ y tế tại Thừa Thiên Huế',
                    description: 'Vận chuyển thiết bị y tế đến trạm y tế xã Phú Mỹ, Phú Vang, Thừa Thiên Huế',
                    from: 'Kho Huế',
                    to: 'Xã Phú Mỹ, Phú Vang, Thừa Thiên Huế',
                    toLat: 16.3859,
                    toLng: 107.6689,
                    pickupName: 'Điểm tập kết Huế',
                    pickupLat: 16.4630,
                    pickupLng: 107.5900,
                    qty: 30,
                    requiredVolunteers: 2,
                    priority: 'high',
                    deadline: '2026-07-08',
                    status: 'pending',
                    volunteers: [],
                    createdAt: new Date(Date.now() - 14400000).toISOString()
                },
                {
                    id: 'msn_6',
                    code: 'NV0006',
                    title: '🚚 Cứu trợ khẩn cấp tại Quảng Trị',
                    description: 'Vận chuyển 150 bộ shelter đến xã Hải Lâm, Hải Lăng, Quảng Trị',
                    from: 'Kho Đồng Hới',
                    to: 'Xã Hải Lâm, Hải Lăng, Quảng Trị',
                    toLat: 16.6989,
                    toLng: 107.2689,
                    pickupName: 'Điểm tập kết Đồng Hới',
                    pickupLat: 17.4690,
                    pickupLng: 106.5970,
                    qty: 150,
                    requiredVolunteers: 4,
                    priority: 'critical',
                    deadline: '2026-07-05',
                    status: 'pending',
                    volunteers: [],
                    createdAt: new Date(Date.now() - 18000000).toISOString()
                },
                {
                    id: 'msn_7',
                    code: 'NV0007',
                    title: '📦 Phân phát thực phẩm tại Bình Định',
                    description: 'Phân phát 250 suất ăn đến xã Phước Thắng, Tuy Phước, Bình Định',
                    from: 'Kho Đà Nẵng',
                    to: 'Xã Phước Thắng, Tuy Phước, Bình Định',
                    toLat: 13.8989,
                    toLng: 109.1489,
                    pickupName: 'Điểm tập kết Đà Nẵng',
                    pickupLat: 16.0544,
                    pickupLng: 108.2022,
                    qty: 250,
                    requiredVolunteers: 3,
                    priority: 'high',
                    deadline: '2026-07-18',
                    status: 'done',
                    volunteers: [
                        { name: 'Tình nguyện viên', joinedAt: new Date(Date.now() - 86400000 * 2).toISOString() }
                    ],
                    completedAt: new Date(Date.now() - 86400000).toISOString(),
                    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
                }
            ];
            this.setMissions(sampleMissions);
            console.log(`✅ Đã tạo ${sampleMissions.length} nhiệm vụ với địa chỉ thực tế`);
        }

        // ===== REQUESTS =====
        if (this.getRequests().length === 0) {
            const sampleRequests = [
                {
                    id: 'req_1',
                    code: 'YC0001',
                    name: 'Nguyễn Văn An',
                    phone: '0987 654 321',
                    lat: 15.8439,
                    lng: 108.1829,
                    xa: 'Xã Bình Mỹ',
                    huyen: 'Điện Bàn',
                    tinh: 'Quảng Nam',
                    statuses: ['Nhà bị sập hoàn toàn', 'Gia đình có trẻ nhỏ'],
                    adults: 4,
                    children: 2,
                    totalPeople: 6,
                    shelterNeed: 3,
                    urgency: 'critical',
                    status: 'pending',
                    createdAt: new Date(Date.now() - 3600000).toISOString()
                },
                {
                    id: 'req_2',
                    code: 'YC0002',
                    name: 'Trần Thị Bình',
                    phone: '0976 543 210',
                    lat: 16.4439,
                    lng: 107.7029,
                    xa: 'Xã Vĩnh Hậu',
                    huyen: 'Phú Vang',
                    tinh: 'Thừa Thiên Huế',
                    statuses: ['Nhà hư hỏng nặng', 'Có người già'],
                    adults: 3,
                    children: 1,
                    totalPeople: 4,
                    shelterNeed: 2,
                    urgency: 'high',
                    status: 'pending',
                    createdAt: new Date(Date.now() - 7200000).toISOString()
                },
                {
                    id: 'req_3',
                    code: 'YC0003',
                    name: 'Lê Văn Cường',
                    phone: '0965 432 109',
                    lat: 17.4989,
                    lng: 106.3859,
                    xa: 'Xã Bình Thạnh',
                    huyen: 'Bố Trạch',
                    tinh: 'Quảng Bình',
                    statuses: ['Không còn nơi ở', 'Có người khuyết tật'],
                    adults: 2,
                    children: 3,
                    totalPeople: 5,
                    shelterNeed: 3,
                    urgency: 'critical',
                    status: 'pending',
                    createdAt: new Date(Date.now() - 1800000).toISOString()
                }
            ];
            this.setRequests(sampleRequests);
            console.log(`✅ Đã tạo ${sampleRequests.length} yêu cầu mẫu`);
        }

        // ===== REPORTS =====
        if (this.getReports().length === 0) {
            const sampleReports = [
                {
                    id: 'rpt_1',
                    code: 'BC0001',
                    title: 'Ngập lụt tại xã Bình Mỹ',
                    location: 'Xã Bình Mỹ, Điện Bàn, Quảng Nam',
                    type: 'flood',
                    typeLabel: '🌊 Ngập lụt',
                    severity: 'critical',
                    status: 'pending',
                    desc: 'Nước dâng cao 1.5m, 200 hộ bị ảnh hưởng',
                    reporter: 'Nguyễn Văn An',
                    lat: 15.8439,
                    lng: 108.1829,
                    createdAt: new Date(Date.now() - 7200000).toISOString()
                },
                {
                    id: 'rpt_2',
                    code: 'BC0002',
                    title: 'Sạt lở đường Hồ Chí Minh',
                    location: 'Đường Hồ Chí Minh, Quảng Trị',
                    type: 'landslide',
                    typeLabel: '🏔️ Sạt lở',
                    severity: 'high',
                    status: 'processing',
                    desc: 'Sạt lở nghiêm trọng, ách tắc giao thông',
                    reporter: 'Trần Văn Nam',
                    lat: 16.6989,
                    lng: 107.2689,
                    createdAt: new Date(Date.now() - 10800000).toISOString()
                }
            ];
            this.setReports(sampleReports);
            console.log(`✅ Đã tạo ${sampleReports.length} báo cáo mẫu`);
        }

        // ===== RESIDENTS =====
        if (this.getResidents().length === 0) {
            this.setResidents([
                { id: 'res_1', code: 'DN0001', name: 'Nguyễn Văn An', address: 'Xã Bình Mỹ, Điện Bàn, Quảng Nam', phone: '0987 654 321', status: 'Đã hỗ trợ' },
                { id: 'res_2', code: 'DN0002', name: 'Trần Thị Bình', address: 'Xã Vĩnh Hậu, Phú Vang, Thừa Thiên Huế', phone: '0976 543 210', status: 'Đang chờ' }
            ]);
        }

        // ===== VOLUNTEERS =====
        if (this.getVolunteers().length === 0) {
            this.setVolunteers([
                { id: 'vol_1', code: 'TNV001', name: 'Nguyễn Hoàng Long', area: 'Đà Nẵng', skills: ['Vận chuyển', 'Lắp đặt'], status: 'active' },
                { id: 'vol_2', code: 'TNV002', name: 'Trần Thị Mai', area: 'Thừa Thiên Huế', skills: ['Phân phát', 'Y tế'], status: 'active' }
            ]);
        }

        // ===== WAREHOUSES =====
        if (this.getWarehouses().length === 0) {
            const sampleWarehouses = [
                { id: 'wh_1', code: 'K001', name: 'Kho Đà Nẵng', lat: 16.0544, lng: 108.2022, district: 'Đà Nẵng', capacity: 5000, status: 'active' },
                { id: 'wh_2', code: 'K002', name: 'Kho Huế', lat: 16.4630, lng: 107.5900, district: 'Thừa Thiên Huế', capacity: 3500, status: 'active' },
                { id: 'wh_3', code: 'K003', name: 'Kho Đồng Hới', lat: 17.4690, lng: 106.5970, district: 'Quảng Bình', capacity: 2000, status: 'active' }
            ];
            this.setWarehouses(sampleWarehouses);
            console.log(`✅ Đã tạo ${sampleWarehouses.length} kho mẫu`);
        }

        // ===== INVENTORY =====
        if (this.getInventory().length === 0) {
            const sampleInventory = [
                { id: 'inv_1', warehouseId: 'wh_1', name: 'Shelter 24m²', quantity: 120, min: 30, safetyStock: 20 },
                { id: 'inv_2', warehouseId: 'wh_1', name: 'Shelter 30m²', quantity: 80, min: 25, safetyStock: 15 },
                { id: 'inv_3', warehouseId: 'wh_2', name: 'Shelter 24m²', quantity: 95, min: 30, safetyStock: 20 },
                { id: 'inv_4', warehouseId: 'wh_3', name: 'Shelter 24m²', quantity: 45, min: 20, safetyStock: 15 }
            ];
            this.setInventory(sampleInventory);
            console.log(`✅ Đã tạo ${sampleInventory.length} tồn kho mẫu`);
        }

        // ===== SUPPLIERS =====
        if (this.getSuppliers().length === 0) {
            const sampleSuppliers = [
                { id: 'sup_1', code: 'NCC001', name: 'Công ty TNHH Cứu trợ Miền Trung', phone: '0912 345 678', capacity: 1500, leadTime: 24, status: 'active', lat: 16.0544, lng: 108.2022 },
                { id: 'sup_2', code: 'NCC002', name: 'Tổng công ty Vật tư - Hậu cần', phone: '0913 456 789', capacity: 1200, leadTime: 36, status: 'active', lat: 16.4630, lng: 107.5900 },
                { id: 'sup_3', code: 'NCC003', name: 'Công ty Cổ phần Thiết bị Cứu hộ', phone: '0914 567 890', capacity: 800, leadTime: 48, status: 'inactive', lat: 17.4690, lng: 106.5970 }
            ];
            this.setSuppliers(sampleSuppliers);
            console.log(`✅ Đã tạo ${sampleSuppliers.length} nhà cung cấp mẫu`);
        }

        // ===== STATS =====
        const stats = this.getStats();
        if (!stats.totalRequests) {
            this.setStats({
                totalRequests: 3,
                pendingRequests: 3,
                processingRequests: 0,
                completedRequests: 0,
                totalShelter: 340,
                deliveredShelter: 0,
                activeVolunteers: 2,
                responseTime: 18.6,
                fulfillmentRate: 0
            });
        }

        console.log('✅ HLMS Seed data completed!');
    },

    // ============================================================
    // RESET DATA
    // ============================================================
    resetAll() {
        if (!confirm('⚠️ Xóa TẤT CẢ dữ liệu?')) return false;
        Object.values(this.KEYS).forEach(key => localStorage.removeItem(key));
        localStorage.removeItem('inventory_history');
        localStorage.removeItem('hlms_admin_module');
        localStorage.removeItem('hlms_saved_credentials');
        this.seedData();
        this.addSignal('🔄 Đã reset dữ liệu', 'warning');
        return true;
    }
};

// ============================================================
// SEED DATA NGAY LẬP TỨC
// ============================================================
(function() {
    console.log('🚀 HLMS: Khởi tạo AppData...');
    AppData.seedData();
    console.log('✅ HLMS AppData ready!');
})();

window.AppData = AppData;
console.log('✅ HLMS DataStore loaded!');