// ============================================================
// LOCATION DATA - DỮ LIỆU ĐỊA LÝ MIỀN TRUNG
// ============================================================

const LocationData = {
    // Phiên bản dữ liệu
    version: '1.0',
    lastUpdated: '2026-06-29',

    // ============================================================
    // DỮ LIỆU TỈNH - HUYỆN - XÃ
    // ============================================================
    provinces: [
        {
            id: 'thanh_hoa',
            name: 'Thanh Hóa',
            districts: [
                {
                    id: 'muong_lat',
                    name: 'Mường Lát',
                    wards: ['Mường Lát', 'Mường Chanh', 'Pù Péc', 'Nhi Sơn', 'Quang Chiểu', 'Tam Chung', 'Trung Lý', 'Mường Lý', 'Sơn Thủy']
                },
                {
                    id: 'quan_son',
                    name: 'Quan Sơn',
                    wards: ['Quan Sơn', 'Sơn Điện', 'Sơn Hà', 'Sơn Lư', 'Sơn Thủy', 'Sơn Ninh', 'Sơn Bình', 'Sơn Hải']
                },
                {
                    id: 'ba_thuoc',
                    name: 'Bá Thước',
                    wards: ['Ba Thước', 'Ái Thượng', 'Ban Công', 'Cổ Lũng', 'Lũng Cao', 'Lũng Niêm', 'Thành Sơn', 'Thiết Ống']
                },
                {
                    id: 'cam_thuy',
                    name: 'Cẩm Thủy',
                    wards: ['Cẩm Thủy', 'Cẩm Tân', 'Cẩm Bình', 'Cẩm Vân', 'Cẩm Tú', 'Cẩm Tâm', 'Cẩm Sơn', 'Cẩm Phong']
                },
                {
                    id: 'thuong_xuan',
                    name: 'Thường Xuân',
                    wards: ['Thường Xuân', 'Bát Mọt', 'Lương Sơn', 'Ngọc Phụng', 'Tân Thành', 'Xuân Dương', 'Xuân Lộc', 'Xuân Thắng']
                },
                {
                    id: 'lang_chanh',
                    name: 'Lang Chánh',
                    wards: ['Lang Chánh', 'Đồng Lương', 'Giao Thiện', 'Tam Văn', 'Xuân Bái', 'Yên Khương', 'Yên Thắng']
                },
                {
                    id: 'thanh_hoa_city',
                    name: 'TP Thanh Hóa',
                    wards: ['An Hưng', 'Ba Đình', 'Điện Biên', 'Đông Hải', 'Đông Hương', 'Đông Thọ', 'Hàm Rồng', 'Hoằng Đại']
                }
            ]
        },
        {
            id: 'nghe_an',
            name: 'Nghệ An',
            districts: [
                {
                    id: 'ky_son',
                    name: 'Kỳ Sơn',
                    wards: ['Kỳ Sơn', 'Bảo Thắng', 'Bảo Hà', 'Chiêu Lưu', 'Hữu Kiệm', 'Mường Ải', 'Mường Lống', 'Na Ngoi']
                },
                {
                    id: 'tuong_duong',
                    name: 'Tương Dương',
                    wards: ['Tương Dương', 'Hợp Hòa', 'Hữu Khuông', 'Lưỡng Minh', 'Mai Sơn', 'Nhôn Mai', 'Tam Hợp', 'Tân Long']
                },
                {
                    id: 'con_cuong',
                    name: 'Con Cuông',
                    wards: ['Con Cuông', 'Bình Chuẩn', 'Cam Lâm', 'Chi Khê', 'Đôn Phục', 'Lạng Khê', 'Môn Sơn', 'Thạch Ngàn']
                },
                {
                    id: 'quy_chau',
                    name: 'Quỳ Châu',
                    wards: ['Quỳ Châu', 'Châu Bình', 'Châu Hạnh', 'Châu Hoàn', 'Châu Hội', 'Châu Nga', 'Châu Phong', 'Châu Thái']
                },
                {
                    id: 'que_phong',
                    name: 'Quế Phong',
                    wards: ['Quế Phong', 'Căm Muộn', 'Châu Kim', 'Châu Thôn', 'Đồng Văn', 'Hạnh Dịch', 'Mường Nọc', 'Thông Thụ']
                },
                {
                    id: 'thanh_chuong',
                    name: 'Thanh Chương',
                    wards: ['Thanh Chương', 'Cát Văn', 'Hạnh Lâm', 'Ngọc Lâm', 'Ngọc Sơn', 'Phong Thịnh', 'Thanh An', 'Thanh Đồng']
                },
                {
                    id: 'vinh_city',
                    name: 'TP Vinh',
                    wards: ['Bến Thủy', 'Cửa Nam', 'Đông Vĩnh', 'Hà Huy Tập', 'Hồng Sơn', 'Lê Lợi', 'Quang Trung', 'Trường Thi']
                }
            ]
        },
        {
            id: 'ha_tinh',
            name: 'Hà Tĩnh',
            districts: [
                {
                    id: 'huong_khe',
                    name: 'Hương Khê',
                    wards: ['Hương Khê', 'Điền Mỹ', 'Gia Phố', 'Hà Linh', 'Hòa Hải', 'Hương Bình', 'Hương Đô', 'Hương Giang']
                },
                {
                    id: 'huong_son',
                    name: 'Hương Sơn',
                    wards: ['Hương Sơn', 'An Hòa Thịnh', 'Kim Hoa', 'Quang Diệm', 'Sơn Bằng', 'Sơn Châu', 'Sơn Hà', 'Sơn Hồng']
                },
                {
                    id: 'vu_quang',
                    name: 'Vũ Quang',
                    wards: ['Vũ Quang', 'Ân Phú', 'Đức Bồng', 'Đức Giang', 'Đức Hương', 'Đức Liên', 'Hương Điền', 'Hương Minh']
                },
                {
                    id: 'duc_tho',
                    name: 'Đức Thọ',
                    wards: ['Đức Thọ', 'An Dũng', 'Bùi La Nhân', 'Đức An', 'Đức Đồng', 'Đức Lạng', 'Đức Nhân', 'Đức Thanh']
                },
                {
                    id: 'cam_xuyen',
                    name: 'Cẩm Xuyên',
                    wards: ['Cẩm Xuyên', 'Cẩm Bình', 'Cẩm Duệ', 'Cẩm Hà', 'Cẩm Hưng', 'Cẩm Lạc', 'Cẩm Lộc', 'Cẩm Minh']
                },
                {
                    id: 'ky_anh',
                    name: 'Kỳ Anh',
                    wards: ['Kỳ Anh', 'Kỳ Đồng', 'Kỳ Hà', 'Kỳ Hải', 'Kỳ Lạc', 'Kỳ Nam', 'Kỳ Phong', 'Kỳ Thượng']
                }
            ]
        },
        {
            id: 'quang_binh',
            name: 'Quảng Bình',
            districts: [
                {
                    id: 'minh_hoa',
                    name: 'Minh Hóa',
                    wards: ['Dân Hóa', 'Trọng Hóa', 'Hóa Sơn', 'Hóa Hợp', 'Hóa Phúc', 'Hóa Thanh', 'Thượng Hóa', 'Trung Hóa']
                },
                {
                    id: 'tuyen_hoa',
                    name: 'Tuyên Hóa',
                    wards: ['Tuyên Hóa', 'Đồng Hóa', 'Lâm Hóa', 'Mai Hóa', 'Ngư Hóa', 'Phong Hóa', 'Sơn Hóa', 'Thạch Hóa']
                },
                {
                    id: 'bo_trach',
                    name: 'Bố Trạch',
                    wards: ['Bố Trạch', 'Bắc Trạch', 'Cự Nẫm', 'Đại Trạch', 'Đồng Trạch', 'Đức Trạch', 'Hạ Trạch', 'Hải Trạch']
                },
                {
                    id: 'quang_ninh',
                    name: 'Quảng Ninh',
                    wards: ['Quảng Ninh', 'An Ninh', 'Duy Ninh', 'Gia Ninh', 'Hải Ninh', 'Hàm Ninh', 'Hiền Ninh', 'Lương Ninh']
                },
                {
                    id: 'le_thuy',
                    name: 'Lệ Thủy',
                    wards: ['An Thủy', 'Mai Thủy', 'Phong Thủy', 'Cam Thủy', 'Sen Thủy', 'Sơn Thủy', 'Tân Thủy', 'Thái Thủy']
                }
            ]
        },
        {
            id: 'quang_tri',
            name: 'Quảng Trị',
            districts: [
                {
                    id: 'huong_hoa',
                    name: 'Hướng Hóa',
                    wards: ['Hướng Việt', 'Hướng Phùng', 'Hướng Sơn', 'Hướng Linh', 'Hướng Lập', 'Tân Liên', 'Tân Lập', 'Tân Thành']
                },
                {
                    id: 'dakrong',
                    name: 'Đakrông',
                    wards: ['Ba Nang', 'A Bung', 'A Ngo', 'Húc Nghì', 'Tà Long', 'Tà Rụt', 'Krông Klang', 'Mó O']
                },
                {
                    id: 'cam_lo',
                    name: 'Cam Lộ',
                    wards: ['Cam Lộ', 'Cam An', 'Cam Chính', 'Cam Hiếu', 'Cam Nghĩa', 'Cam Thành', 'Cam Thủy', 'Cam Tuyền']
                },
                {
                    id: 'hai_lang',
                    name: 'Hải Lăng',
                    wards: ['Hải Lăng', 'Hải An', 'Hải Ba', 'Hải Chánh', 'Hải Dương', 'Hải Hòa', 'Hải Khê', 'Hải Lâm']
                },
                {
                    id: 'trieu_phong',
                    name: 'Triệu Phong',
                    wards: ['Triệu Phong', 'Triệu Ái', 'Triệu An', 'Triệu Đại', 'Triệu Đông', 'Triệu Giang', 'Triệu Hòa', 'Triệu Lăng']
                }
            ]
        },
        {
            id: 'thua_thien_hue',
            name: 'Thừa Thiên Huế',
            districts: [
                {
                    id: 'a_luoi',
                    name: 'A Lưới',
                    wards: ['Hồng Bắc', 'Hồng Kim', 'Hồng Thượng', 'Hồng Vân', 'Nhâm', 'A Ngo', 'A Roàng', 'Đông Sơn']
                },
                {
                    id: 'phu_loc',
                    name: 'Phú Lộc',
                    wards: ['Lộc Trì', 'Lộc Tiến', 'Lộc Thủy', 'Lộc Bổn', 'Vinh Hiền', 'Vinh Hưng', 'Vinh Mỹ', 'Vinh Thanh']
                },
                {
                    id: 'phu_vang',
                    name: 'Phú Vang',
                    wards: ['Phú Vang', 'Phú An', 'Phú Diên', 'Phú Gia', 'Phú Hải', 'Phú Mỹ', 'Phú Tân', 'Phú Thượng']
                },
                {
                    id: 'quang_dien',
                    name: 'Quảng Điền',
                    wards: ['Quảng Điền', 'Quảng An', 'Quảng Công', 'Quảng Lợi', 'Quảng Ngạn', 'Quảng Phú', 'Quảng Phước', 'Quảng Thọ']
                },
                {
                    id: 'huong_tra',
                    name: 'Hương Trà',
                    wards: ['Hương Trà', 'Hương An', 'Hương Bình', 'Hương Hồ', 'Hương Long', 'Hương Sơ', 'Hương Thọ', 'Hương Vân']
                },
                {
                    id: 'huong_thuy',
                    name: 'Hương Thủy',
                    wards: ['Hương Thủy', 'Hương Phong', 'Hương Phú', 'Hương Sơn', 'Hương Thọ', 'Thủy An', 'Thủy Bằng', 'Thủy Lương']
                }
            ]
        },
        {
            id: 'da_nang',
            name: 'Đà Nẵng',
            districts: [
                {
                    id: 'hoa_vang',
                    name: 'Hòa Vang',
                    wards: ['Hòa Vang', 'Hòa Bắc', 'Hòa Châu', 'Hòa Khương', 'Hòa Liên', 'Hòa Nhơn', 'Hòa Ninh', 'Hòa Phong']
                },
                {
                    id: 'lien_chieu',
                    name: 'Liên Chiểu',
                    wards: ['Liên Chiểu', 'Hòa Hiệp Bắc', 'Hòa Hiệp Nam', 'Hòa Khánh Bắc', 'Hòa Khánh Nam', 'Hòa Minh']
                },
                {
                    id: 'son_tra',
                    name: 'Sơn Trà',
                    wards: ['Sơn Trà', 'An Hải Bắc', 'An Hải Đông', 'An Hải Tây', 'Mân Thái', 'Nại Hiên Đông', 'Thọ Quang']
                }
            ]
        },
        {
            id: 'quang_nam',
            name: 'Quảng Nam',
            districts: [
                {
                    id: 'nam_tra_my',
                    name: 'Nam Trà My',
                    wards: ['Trà Leng', 'Trà Mai', 'Trà Don', 'Trà Cang', 'Trà Vân', 'Trà Linh', 'Trà Tập', 'Trà Nam', 'Trà Dơn', 'Trà Vinh']
                },
                {
                    id: 'bac_tra_my',
                    name: 'Bắc Trà My',
                    wards: ['Trà Giang', 'Trà Đông', 'Trà Sơn', 'Trà Kót', 'Trà Nú', 'Trà Bui', 'Trà Bồng', 'Trà Tân']
                },
                {
                    id: 'phuoc_son',
                    name: 'Phước Sơn',
                    wards: ['Phước Sơn', 'Phước Chánh', 'Phước Công', 'Phước Đức', 'Phước Hiệp', 'Phước Hòa', 'Phước Kim', 'Phước Lộc']
                },
                {
                    id: 'dong_giang',
                    name: 'Đông Giang',
                    wards: ['Đông Giang', 'A Nông', 'A Rooi', 'A Tiêng', 'Ba', 'Jơ Ngây', 'Mà Cooih', 'Pà Cô']
                },
                {
                    id: 'dai_loc',
                    name: 'Đại Lộc',
                    wards: ['Đại Lộc', 'Đại An', 'Đại Chánh', 'Đại Cường', 'Đại Đồng', 'Đại Hiệp', 'Đại Hòa', 'Đại Lãnh']
                },
                {
                    id: 'hoi_an',
                    name: 'Hội An',
                    wards: ['Hội An', 'Cẩm An', 'Cẩm Châu', 'Cẩm Nam', 'Cẩm Phô', 'Cẩm Thanh', 'Minh An', 'Sơn Phong']
                }
            ]
        },
        {
            id: 'quang_ngai',
            name: 'Quảng Ngãi',
            districts: [
                {
                    id: 'ba_to',
                    name: 'Ba Tơ',
                    wards: ['Ba Tơ', 'Ba Bích', 'Ba Cung', 'Ba Điền', 'Ba Giang', 'Ba Lế', 'Ba Liên', 'Ba Nam']
                },
                {
                    id: 'son_tay',
                    name: 'Sơn Tây',
                    wards: ['Sơn Tây', 'Sơn Ba', 'Sơn Bua', 'Sơn Màu', 'Sơn Tân', 'Sơn Thượng']
                },
                {
                    id: 'son_ha',
                    name: 'Sơn Hà',
                    wards: ['Sơn Hà', 'Sơn Ba', 'Sơn Bao', 'Sơn Cao', 'Sơn Giang', 'Sơn Hạ', 'Sơn Linh', 'Sơn Nham']
                },
                {
                    id: 'minh_long',
                    name: 'Minh Long',
                    wards: ['Minh Long', 'Long Hiệp', 'Long Mai', 'Long Môn', 'Long Sơn', 'Long Thanh']
                },
                {
                    id: 'tra_bong',
                    name: 'Trà Bồng',
                    wards: ['Trà Bồng', 'Trà Bình', 'Trà Châu', 'Trà Giang', 'Trà Lâm', 'Trà Phú', 'Trà Sơn', 'Trà Tân']
                },
                {
                    id: 'binh_son',
                    name: 'Bình Sơn',
                    wards: ['Bình Sơn', 'Bình An', 'Bình Chánh', 'Bình Châu', 'Bình Đông', 'Bình Dương', 'Bình Hải', 'Bình Hiệp']
                }
            ]
        },
        {
            id: 'binh_dinh',
            name: 'Bình Định',
            districts: [
                {
                    id: 'an_lao',
                    name: 'An Lão',
                    wards: ['An Lão', 'An Dũng', 'An Hòa', 'An Hưng', 'An Nghĩa', 'An Quang', 'An Tân', 'An Toàn']
                },
                {
                    id: 'vinh_thanh',
                    name: 'Vĩnh Thạnh',
                    wards: ['Vĩnh Thạnh', 'Vĩnh Hảo', 'Vĩnh Hiệp', 'Vĩnh Hòa', 'Vĩnh Kim', 'Vĩnh Quang', 'Vĩnh Sơn', 'Vĩnh Thuận']
                },
                {
                    id: 'hoai_an',
                    name: 'Hoài Ân',
                    wards: ['Hoài Ân', 'Ân Đức', 'Ân Hảo', 'Ân Hữu', 'Ân Mỹ', 'Ân Nghĩa', 'Ân Phong', 'Ân Tín']
                },
                {
                    id: 'tay_son',
                    name: 'Tây Sơn',
                    wards: ['Tây Sơn', 'Bình Hòa', 'Bình Nghi', 'Bình Tân', 'Bình Thành', 'Bình Thuận', 'Bình Tường', 'Tây An']
                },
                {
                    id: 'phu_cat',
                    name: 'Phù Cát',
                    wards: ['Phù Cát', 'Cát Chánh', 'Cát Hải', 'Cát Hanh', 'Cát Hiệp', 'Cát Hưng', 'Cát Khánh', 'Cát Lâm']
                }
            ]
        },
        {
            id: 'phu_yen',
            name: 'Phú Yên',
            districts: [
                {
                    id: 'dong_xuan',
                    name: 'Đồng Xuân',
                    wards: ['Đồng Xuân', 'Phú Mỹ', 'Phú Xuân', 'Xuân Long', 'Xuân Lộc', 'Xuân Phước', 'Xuân Quang', 'Xuân Sơn']
                },
                {
                    id: 'son_hoa',
                    name: 'Sơn Hòa',
                    wards: ['Sơn Hòa', 'Cà Lúi', 'Krông Pa', 'Phước Tân', 'Sơn Định', 'Sơn Hội', 'Sơn Long', 'Sơn Phước']
                },
                {
                    id: 'song_hinh',
                    name: 'Sông Hinh',
                    wards: ['Sông Hinh', 'Đức Bình Đông', 'Đức Bình Tây', 'Ea Bá', 'Ea Lâm', 'Ea Rốk', 'Sơn Giang', 'Sơn Long']
                },
                {
                    id: 'tuy_an',
                    name: 'Tuy An',
                    wards: ['Tuy An', 'An Chấn', 'An Cư', 'An Định', 'An Dân', 'An Hiệp', 'An Hòa', 'An Nghiệp']
                },
                {
                    id: 'dong_hoa',
                    name: 'Đông Hòa',
                    wards: ['Đông Hòa', 'Hòa An', 'Hòa Bình', 'Hòa Định', 'Hòa Hiệp', 'Hòa Phong', 'Hòa Thắng', 'Hòa Xuân']
                }
            ]
        },
        {
            id: 'khanh_hoa',
            name: 'Khánh Hòa',
            districts: [
                {
                    id: 'khanh_son',
                    name: 'Khánh Sơn',
                    wards: ['Khánh Sơn', 'Ba Cụm Bắc', 'Ba Cụm Nam', 'Sơn Bình', 'Sơn Hiệp', 'Sơn Lâm', 'Sơn Trung', 'Thành Sơn']
                },
                {
                    id: 'khanh_vinh',
                    name: 'Khánh Vĩnh',
                    wards: ['Khánh Vĩnh', 'Cầu Bà', 'Giang Ly', 'Khánh Bình', 'Khánh Đông', 'Khánh Hiệp', 'Khánh Nam', 'Khánh Phú']
                },
                {
                    id: 'cam_lam',
                    name: 'Cam Lâm',
                    wards: ['Cam Lâm', 'Cam An Bắc', 'Cam An Nam', 'Cam Đức', 'Cam Hải Đông', 'Cam Hải Tây', 'Cam Hiệp Bắc', 'Cam Hiệp Nam']
                },
                {
                    id: 'ninh_hoa',
                    name: 'Ninh Hòa',
                    wards: ['Ninh Hòa', 'Ninh An', 'Ninh Bình', 'Ninh Đa', 'Ninh Diêm', 'Ninh Đông', 'Ninh Giang', 'Ninh Hà']
                }
            ]
        },
        {
            id: 'ninh_thuan',
            name: 'Ninh Thuận',
            districts: [
                {
                    id: 'bac_ai',
                    name: 'Bác Ái',
                    wards: ['Bác Ái', 'Phước Bình', 'Phước Hòa', 'Phước Tân', 'Phước Thắng', 'Phước Thành', 'Phước Trung']
                },
                {
                    id: 'ninh_son',
                    name: 'Ninh Sơn',
                    wards: ['Ninh Sơn', 'Lâm Sơn', 'Lương Sơn', 'Ma Nới', 'Mỹ Sơn', 'Nhơn Sơn', 'Quảng Sơn', 'Tân Sơn']
                },
                {
                    id: 'thuan_bac',
                    name: 'Thuận Bắc',
                    wards: ['Thuận Bắc', 'Bắc Phong', 'Bắc Sơn', 'Công Hải', 'Lợi Hải', 'Phước Chiến', 'Phước Kháng']
                }
            ]
        },
        {
            id: 'binh_thuan',
            name: 'Bình Thuận',
            districts: [
                {
                    id: 'duc_linh',
                    name: 'Đức Linh',
                    wards: ['Đức Linh', 'Đa Kai', 'Đức Chính', 'Đức Hạnh', 'Đức Hiệp', 'Đức Hòa', 'Đức Tín', 'Mê Pu']
                },
                {
                    id: 'tanh_linh',
                    name: 'Tánh Linh',
                    wards: ['Tánh Linh', 'Bắc Ruộng', 'Đức Bắc', 'Đức Phú', 'Đức Thuận', 'Gia An', 'Gia Huynh', 'Lạc Tánh']
                },
                {
                    id: 'ham_thuan_bac',
                    name: 'Hàm Thuận Bắc',
                    wards: ['Hàm Thuận Bắc', 'Đa Mi', 'Hàm Chính', 'Hàm Đức', 'Hàm Hiệp', 'Hàm Liêm', 'Hàm Phú', 'Hàm Thắng']
                },
                {
                    id: 'bac_binh',
                    name: 'Bắc Bình',
                    wards: ['Bắc Bình', 'Bình Tân', 'Hải Ninh', 'Hòa Thắng', 'Hồng Phong', 'Hồng Thái', 'Phan Điền', 'Phan Thanh']
                }
            ]
        }
    ],

    // ============================================================
    // PHƯƠNG THỨC HỖ TRỢ
    // ============================================================
    
    // Lấy danh sách tỉnh
    getProvinces() {
        return this.provinces.map(p => ({
            id: p.id,
            name: p.name
        }));
    },

    // Lấy danh sách huyện theo tỉnh
    getDistricts(provinceId) {
        const province = this.provinces.find(p => p.id === provinceId);
        if (!province) return [];
        return province.districts.map(d => ({
            id: d.id,
            name: d.name
        }));
    },

    // Lấy danh sách xã theo huyện
    getWards(districtId) {
        for (const province of this.provinces) {
            for (const district of province.districts) {
                if (district.id === districtId) {
                    return district.wards.map(w => ({
                        id: w.toLowerCase().replace(/ /g, '_'),
                        name: w
                    }));
                }
            }
        }
        return [];
    },

    // Tìm tỉnh theo tên
    findProvince(name) {
        return this.provinces.find(p => p.name === name);
    },

    // Tìm huyện theo tên và tỉnh
    findDistrict(provinceName, districtName) {
        const province = this.findProvince(provinceName);
        if (!province) return null;
        return province.districts.find(d => d.name === districtName);
    },

    // Tìm xã theo tên và huyện
    findWard(districtName, wardName) {
        for (const province of this.provinces) {
            for (const district of province.districts) {
                if (district.name === districtName) {
                    return district.wards.find(w => w === wardName);
                }
            }
        }
        return null;
    },

    // Lấy toàn bộ dữ liệu
    getAllData() {
        return {
            version: this.version,
            lastUpdated: this.lastUpdated,
            provinces: this.provinces
        };
    },

    // ============================================================
    // TẠO CẤU TRÚC CASCADE DROPDOWN
    // ============================================================
    createCascadeData() {
        const result = {};
        for (const province of this.provinces) {
            result[province.id] = {
                name: province.name,
                districts: {}
            };
            for (const district of province.districts) {
                result[province.id].districts[district.id] = {
                    name: district.name,
                    wards: district.wards
                };
            }
        }
        return result;
    }
};

// ============================================================
// EXPORT
// ============================================================
window.LocationData = LocationData;

console.log('📍 LocationData loaded!');
console.log(`📌 ${LocationData.provinces.length} tỉnh, ${LocationData.provinces.reduce((acc, p) => acc + p.districts.length, 0)} huyện`);