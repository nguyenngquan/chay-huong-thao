import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, ChevronDown, Menu as MenuIcon, X, Utensils, Leaf, Sprout, Heart, MessageCircle, Send } from 'lucide-react';

// Mock Data (Dữ liệu mẫu)
const MOCK_DATA = {
  menu: {
    appetizers: [
      { name: 'Gỏi Cuốn Nấm', description: 'Nấm bào ngư, bún tươi, rau thơm cuốn bánh tráng, dùng kèm sốt tương.', price: '65.000đ', img: 'https://placehold.co/600x400/a3b18a/344e41?text=Gỏi+Cuốn' },
      { name: 'Nem Chay Hà Nội', description: 'Nem rán giòn rụm với nhân rau củ và miến dong, chấm nước mắm chay chua ngọt.', price: '75.000đ', img: 'https://placehold.co/600x400/a3b18a/344e41?text=Nem+Chay' },
      { name: 'Súp Bí Đỏ Hạnh Nhân', description: 'Súp bí đỏ sánh mịn, béo ngậy từ kem dừa và thơm bùi hạnh nhân rang.', price: '55.000đ', img: 'https://placehold.co/600x400/a3b18a/344e41?text=Súp+Bí+Đỏ' },
    ],
    mainDishes: [
      { name: 'Đậu Hũ Non Sốt Nấm Tứ Xuyên', description: 'Đậu hũ non mềm tan, sốt cùng nấm và gia vị Tứ Xuyên cay nhẹ, đậm đà.', price: '125.000đ', img: 'https://placehold.co/600x400/588157/ffffff?text=Đậu+Hũ+Sốt' },
      { name: 'Nấm Kho Tiêu Xanh', description: 'Các loại nấm hảo hạng kho trong niêu đất với tiêu xanh thơm nồng, đưa cơm.', price: '135.000đ', img: 'https://placehold.co/600x400/588157/ffffff?text=Nấm+Kho' },
      { name: 'Lẩu Nấm Dưỡng Sinh', description: 'Nước lẩu ngọt thanh từ rau củ, ăn kèm các loại nấm tươi, đậu phụ và rau xanh.', price: '280.000đ', img: 'https://placehold.co/600x400/588157/ffffff?text=Lẩu+Nấm' },
    ],
    desserts: [
      { name: 'Chè Hạt Sen Long Nhãn', description: 'Vị ngọt thanh của long nhãn, bùi thơm của hạt sen ninh nhừ.', price: '45.000đ', img: 'https://placehold.co/600x400/3a5a40/ffffff?text=Chè+Hạt+Sen' },
      { name: 'Tào Phớ Nước Cốt Dừa', description: 'Tào phớ mềm mịn, chan nước cốt dừa béo ngậy và trân châu dai giòn.', price: '35.000đ', img: 'https://placehold.co/600x400/3a5a40/ffffff?text=Tào+Phớ' },
    ],
    drinks: [
        { name: 'Trà Gừng Mật Ong', description: 'Trà gừng ấm nóng, kết hợp với vị ngọt dịu của mật ong.', price: '40.000đ', img: 'https://placehold.co/600x400/344e41/ffffff?text=Trà+Gừng' },
        { name: 'Nước Ép Cóc Ổi', description: 'Nước ép tươi mát từ cóc và ổi, giàu vitamin C.', price: '50.000đ', img: 'https://placehold.co/600x400/344e41/ffffff?text=Nước+Ép' },
    ]
  },
  cateringMenus: [
    { name: 'Mâm Cỗ An Lành', price: '1.500.000đ / mâm 6 người', items: ['Gỏi ngó sen', 'Nem chay', 'Gà chay hấp lá chanh', 'Cá chay sốt ngũ liễu', 'Canh nấm thập cẩm', 'Xôi gấc', 'Chè trôi nước'], img: 'https://placehold.co/600x400/a3b18a/344e41?text=Mâm+Cỗ+An+Lành' },
    { name: 'Mâm Cỗ Sum Vầy', price: '2.000.000đ / mâm 6 người', items: ['Súp nấm tuyết', 'Salad rau quả', 'Tôm chay chiên xù', 'Thịt chay quay giòn bì', 'Lẩu Thái chay', 'Cơm tám thơm', 'Hoa quả tráng miệng'], img: 'https://placehold.co/600x400/588157/ffffff?text=Mâm+Cỗ+Sum+Vầy' },
    { name: 'Mâm Cỗ Tinh Tế', price: '2.500.000đ / mâm 6 người', items: ['Khai vị 3 món', 'Súp bào ngư chay', 'Hải sâm chay xào nấm đông cô', 'Bò chay lúc lắc', 'Cơm hấp lá sen', 'Canh bóng thả', 'Chè yến tuyết nhĩ'], img: 'https://placehold.co/600x400/3a5a40/ffffff?text=Mâm+Cỗ+Tinh+Tế' },
  ],
  gallery: [
    { type: 'space', url: 'https://placehold.co/800x600/dad7cd/344e41?text=Không+Gian+1', caption: 'Không gian ấm cúng và thanh lịch' },
    { type: 'food', url: 'https://placehold.co/800x600/a3b18a/344e41?text=Món+Ăn+Đặc+Sắc', caption: 'Món ăn được trình bày tinh tế' },
    { type: 'catering', url: 'https://placehold.co/800x600/588157/ffffff?text=Cỗ+Chay+Tại+Gia', caption: 'Dịch vụ nấu cỗ chay tại sự kiện của khách hàng' },
    { type: 'space', url: 'https://placehold.co/800x600/dad7cd/344e41?text=Không+Gian+2', caption: 'Khu vực ngồi riêng tư' },
    { type: 'food', url: 'https://placehold.co/800x600/a3b18a/344e41?text=Lẩu+Chay', caption: 'Nồi lẩu nấm dưỡng sinh hấp dẫn' },
    { type: 'catering', url: 'https://placehold.co/800x600/588157/ffffff?text=Tiệc+Cưới+Chay', caption: 'Mâm cỗ chay cho tiệc cưới' },
  ],
  news: [
    { title: 'Ưu đãi tháng 7: Tặng món tráng miệng cho mỗi bàn đặt trước', date: '01/07/2025', content: 'Nhân dịp hè sang, Hương Thảo dành tặng một phần chè dưỡng nhan cho mỗi bàn khách hàng đặt trước qua website hoặc hotline.', img: 'https://placehold.co/600x400/a3b18a/344e41?text=Ưu+Đãi' },
    { title: 'Bí quyết nấu món chay ngon tại nhà từ bếp trưởng Hương Thảo', date: '15/06/2025', content: 'Bếp trưởng của chúng tôi chia sẻ những mẹo nhỏ để có một bữa cơm chay đậm đà, đủ chất và hấp dẫn ngay tại gian bếp của bạn.', img: 'https://placehold.co/600x400/588157/ffffff?text=Bí+Quyết' },
  ]
};

// Helper Components
const SectionTitle = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">{children}</h2>
);

const SectionSubtitle = ({ children }) => (
  <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">{children}</p>
);

// Page Components

const Header = ({ setPage, activePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: 'Trang Chủ', page: 'home' },
    { name: 'Thực Đơn', page: 'menu' },
    { name: 'Dịch Vụ Nấu Cỗ', page: 'catering' },
    { name: 'Về Chúng Tôi', page: 'about' },
    { name: 'Thư Viện', page: 'gallery' },
    { name: 'Liên Hệ', page: 'contact' },
    { name: 'Tin Tức', page: 'news' },
  ];

  const handleNavClick = (page) => {
    setPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('home')}>
            <h1 className="text-2xl font-bold text-green-800 flex items-center">
              <Leaf className="w-6 h-6 mr-2" />
              Hương Thảo
            </h1>
            <p className="text-xs text-gray-500">Ẩm Thực Chay & Cỗ Chay</p>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <a
                key={link.page}
                href="#"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.page); }}
                className={`text-gray-600 hover:text-green-700 transition-colors duration-300 ${activePage === link.page ? 'font-bold text-green-700' : ''}`}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <button onClick={() => handleNavClick('booking')} className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition-transform duration-300 hover:scale-105">
              Đặt Bàn / Đặt Cỗ
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-green-700">
              {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map(link => (
              <a
                key={link.page}
                href="#"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.page); }}
                className={`text-gray-600 hover:text-green-700 transition-colors duration-300 ${activePage === link.page ? 'font-bold text-green-700' : ''}`}
              >
                {link.name}
              </a>
            ))}
            <button onClick={() => handleNavClick('booking')} className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition-transform duration-300 hover:scale-105 mt-4">
              Đặt Bàn / Đặt Cỗ
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

const HomePage = ({ setPage }) => {
  return (
    <div>
      <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/a3b18a/ffffff?text=Nhà+Hàng+Chay+Hương+Thảo')" }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-fade-in-down">Hương Thảo - Vị Ngon Từ Tâm</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-in-up">Nơi ẩm thực chay không chỉ là món ăn, mà là hành trình tìm về sự an yên và sức khỏe bền vững.</p>
          <button onClick={() => setPage('menu')} className="bg-white text-green-800 font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition-transform duration-300 hover:scale-105 animate-fade-in-up animation-delay-300">
            Khám Phá Thực Đơn
          </button>
        </div>
      </section>
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <img src="https://placehold.co/800x600/588157/ffffff?text=Dịch+Vụ+Nấu+Cỗ+Chay" alt="Dịch vụ nấu cỗ chay" className="rounded-lg shadow-xl" />
            </div>
            <div className="animate-slide-in-right">
              <h3 className="text-sm font-bold uppercase text-green-600 mb-2">Dịch Vụ Hàng Đầu</h3>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nấu Cỗ Chay Tận Nơi Chuyên Nghiệp</h2>
              <p className="text-gray-600 mb-6">
                Hương Thảo mang đến dịch vụ nấu cỗ chay trọn gói cho mọi sự kiện quan trọng của bạn: tiệc cưới, giỗ chạp, liên hoan, khai trương... Chúng tôi cam kết mang đến những mâm cỗ thịnh soạn, ngon miệng và đẹp mắt, góp phần làm nên sự trọn vẹn cho ngày vui của gia đình.
              </p>
              <button onClick={() => setPage('catering')} className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition-transform duration-300 hover:scale-105">
                Tìm Hiểu Thêm
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle>Triết Lý Của Chúng Tôi</SectionTitle>
          <SectionSubtitle>Tại Hương Thảo, mỗi món ăn là một tác phẩm nghệ thuật, được tạo nên từ những nguyên liệu tươi ngon nhất và cái tâm của người đầu bếp.</SectionSubtitle>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Leaf className="w-10 h-10 text-green-700" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Nguyên Liệu Tươi Sạch</h3>
              <p className="text-gray-600">Chúng tôi ưu tiên sử dụng rau củ quả hữu cơ, theo mùa từ các nông trại địa phương uy tín.</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Sprout className="w-10 h-10 text-green-700" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Ẩm Thực Dưỡng Sinh</h3>
              <p className="text-gray-600">Thực đơn được thiết kế cân bằng dinh dưỡng, tốt cho sức khỏe, giúp thanh lọc cơ thể và nuôi dưỡng tâm hồn.</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Heart className="w-10 h-10 text-green-700" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Phục Vụ Tận Tâm</h3>
              <p className="text-gray-600">Không gian ấm cúng và đội ngũ nhân viên chuyên nghiệp luôn sẵn sàng mang đến cho bạn trải nghiệm tuyệt vời nhất.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const MenuPage = () => {
  const MenuCategory = ({ title, dishes }) => (
    <div className="mb-16">
      <h3 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-8 relative inline-block left-1/2 -translate-x-1/2">
        {title}
        <span className="block w-20 h-1 bg-green-200 mx-auto mt-2"></span>
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dishes.map((dish, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <img src={dish.img} alt={dish.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-800">{dish.name}</h4>
              <p className="text-gray-600 mt-2 mb-4 h-16">{dish.description}</p>
              <p className="text-lg font-semibold text-green-700">{dish.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Thực Đơn Nhà Hàng</SectionTitle>
        <SectionSubtitle>Khám phá hương vị chay tinh tế, được chế biến công phu từ những nguyên liệu tươi ngon nhất, mang đến cho bạn một trải nghiệm ẩm thực khó quên.</SectionSubtitle>
        
        <MenuCategory title="Món Khai Vị" dishes={MOCK_DATA.menu.appetizers} />
        <MenuCategory title="Món Chính" dishes={MOCK_DATA.menu.mainDishes} />
        <MenuCategory title="Món Tráng Miệng" dishes={MOCK_DATA.menu.desserts} />
        <MenuCategory title="Đồ Uống" dishes={MOCK_DATA.menu.drinks} />
      </div>
    </div>
  );
};

const CateringServicePage = () => {
  const Step = ({ number, title, description }) => (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center font-bold text-xl">
        {number}
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-bold text-gray-800">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Dịch Vụ Nấu Cỗ Chay Tận Nơi</SectionTitle>
        <SectionSubtitle>Để mỗi sự kiện của bạn trở nên đặc biệt, ý nghĩa và trọn vẹn hơn với những mâm cỗ chay thịnh soạn, thanh tịnh và ngon miệng từ Hương Thảo.</SectionSubtitle>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <img src="https://placehold.co/800x600/a3b18a/344e41?text=Tiệc+Chay+Thịnh+Soạn" alt="Tiệc chay" className="rounded-lg shadow-xl" />
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Trọn Gói Cho Mọi Dịp</h3>
            <p className="text-gray-600 mb-4">
              Dù là một đám cưới ấm cúng, một lễ giỗ trang nghiêm, buổi liên hoan công ty hay tiệc mừng tân gia, Hương Thảo đều có thể đáp ứng. Chúng tôi cung cấp dịch vụ nấu cỗ chay chuyên nghiệp, linh hoạt theo mọi yêu cầu về không gian, thời gian và quy mô của quý khách.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Cỗ cưới hỏi, ăn hỏi</li>
              <li>Cỗ giỗ chạp, cúng lễ</li>
              <li>Tiệc liên hoan, sinh nhật, tân gia</li>
              <li>Tiệc buffet chay cho công ty, sự kiện</li>
            </ul>
          </div>
        </div>
        <div className="mb-20 bg-stone-50 py-16 rounded-lg">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Thực Đơn Cỗ Chay Tham Khảo</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
            {MOCK_DATA.cateringMenus.map((menu, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <img src={menu.img} alt={menu.name} className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-green-800">{menu.name}</h4>
                  <p className="text-lg font-semibold text-gray-700 my-2">{menu.price}</p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    {menu.items.map((item, i) => <li key={i} className="flex items-start"><span className="text-green-500 mr-2 mt-1">&#10003;</span> {item}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-600">Thực đơn có thể tùy chỉnh theo yêu cầu và ngân sách của quý khách.</p>
        </div>
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Quy Trình Đặt Cỗ Đơn Giản</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Step number="1" title="Tư Vấn & Lên Ý Tưởng" description="Liên hệ với chúng tôi để chia sẻ về sự kiện của bạn. Đội ngũ Hương Thảo sẽ tư vấn tận tình." />
            <Step number="2" title="Chọn Thực Đơn & Báo Giá" description="Chúng tôi sẽ gửi các gói thực đơn phù hợp hoặc thiết kế riêng và báo giá chi tiết." />
            <Step number="3" title="Xác Nhận & Đặt Cọc" description="Sau khi thống nhất, quý khách xác nhận và đặt cọc để chúng tôi chuẩn bị." />
            <Step number="4" title="Thực Hiện & Thanh Toán" description="Hương Thảo sẽ đến tận nơi chuẩn bị, phục vụ và dọn dẹp. Quý khách nghiệm thu và thanh toán." />
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Vì Sao Chọn Hương Thảo?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <Utensils className="w-12 h-12 text-green-700 mx-auto mb-4" />
              <h4 className="text-lg font-bold">Đầu Bếp Kinh Nghiệm</h4>
              <p className="text-gray-600">Đội ngũ đầu bếp am hiểu ẩm thực chay, sáng tạo trong từng món ăn.</p>
            </div>
            <div className="p-4">
              <Leaf className="w-12 h-12 text-green-700 mx-auto mb-4" />
              <h4 className="text-lg font-bold">Nguyên Liệu Tươi Sạch</h4>
              <p className="text-gray-600">Cam kết 100% nguyên liệu có nguồn gốc rõ ràng, đảm bảo an toàn.</p>
            </div>
            <div className="p-4">
              <Heart className="w-12 h-12 text-green-700 mx-auto mb-4" />
              <h4 className="text-lg font-bold">Phục Vụ Chu Đáo</h4>
              <p className="text-gray-600">Nhân viên chuyên nghiệp, tận tình, đảm bảo sự hài lòng tuyệt đối.</p>
            </div>
            <div className="p-4">
              <Sprout className="w-12 h-12 text-green-700 mx-auto mb-4" />
              <h4 className="text-lg font-bold">Thực Đơn Phong Phú</h4>
              <p className="text-gray-600">Hàng trăm món chay đặc sắc, từ truyền thống đến hiện đại.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Câu Chuyện Hương Thảo</SectionTitle>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="prose lg:prose-lg text-gray-600">
            <p className="lead">
              Hương Thảo ra đời từ tình yêu với ẩm thực và mong muốn lan tỏa những giá trị tốt đẹp của việc ăn chay đến với cộng đồng. Chúng tôi tin rằng, ăn chay không chỉ là một lựa chọn ẩm thực, mà còn là một phong cách sống - sống khỏe mạnh, sống an nhiên và sống hài hòa với thiên nhiên.
            </p>
            <p>
              Tên gọi "Hương Thảo" gợi lên hình ảnh của những loại cây cỏ, gia vị tự nhiên, là linh hồn của mỗi món ăn chúng tôi tạo ra. Đó là hương thơm của đất trời, vị ngọt lành của cây trái, và là tâm huyết của những người đầu bếp luôn trăn trở để mang đến những món chay không chỉ ngon miệng mà còn bổ dưỡng.
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mt-8">Cam kết của chúng tôi</h3>
            <p>
              Tại Hương Thảo, chúng tôi cam kết sử dụng 100% nguyên liệu thực vật tươi sạch, có nguồn gốc rõ ràng. Đội ngũ đầu bếp của chúng tôi, với nhiều năm kinh nghiệm và sự sáng tạo không ngừng, luôn nỗ lực làm mới thực đơn, kết hợp hài hòa giữa ẩm thực chay truyền thống Việt Nam và các phong cách ẩm thực quốc tế, tạo nên những trải nghiệm độc đáo cho thực khách.
            </p>
          </div>
          <div>
            <img src="https://placehold.co/800x1000/3a5a40/ffffff?text=Bếp+Trưởng" alt="Đội ngũ đầu bếp" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Thư Viện Ảnh & Video</SectionTitle>
        <SectionSubtitle>Cùng chiêm ngưỡng không gian nhà hàng, những món ăn đặc sắc và các mâm cỗ chay thịnh soạn mà Hương Thảo đã thực hiện.</SectionSubtitle>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {MOCK_DATA.gallery.map((item, index) => (
            <div key={index} className="mb-4 break-inside-avoid group relative">
              <img src={item.url} alt={item.caption} className="w-full rounded-lg shadow-md" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                <p className="text-white text-center text-lg">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BookingPage = () => {
  const [bookingType, setBookingType] = useState('table');

  return (
    <div className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Đặt Bàn & Yêu Cầu Đặt Cỗ</SectionTitle>
        <SectionSubtitle>Vui lòng điền thông tin bên dưới hoặc gọi ngay hotline <a href="tel:0987654321" className="text-green-700 font-bold">0987.654.321</a> để được tư vấn nhanh nhất.</SectionSubtitle>
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-center border-b border-gray-200 mb-8">
            <button 
              onClick={() => setBookingType('table')}
              className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 ${bookingType === 'table' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
            >
              Đặt Bàn Tại Nhà Hàng
            </button>
            <button 
              onClick={() => setBookingType('catering')}
              className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 ${bookingType === 'catering' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
            >
              Yêu Cầu Tư Vấn Cỗ
            </button>
          </div>

          {bookingType === 'table' ? (
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Họ và tên" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                <input type="tel" placeholder="Số điện thoại" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <input type="date" className="w-full p-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                <input type="time" className="w-full p-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                <input type="number" placeholder="Số người" min="1" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <textarea placeholder="Yêu cầu đặc biệt (nếu có)" rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"></textarea>
              <button type="submit" className="w-full bg-green-700 text-white p-4 rounded-lg font-bold text-lg hover:bg-green-800 transition-colors">Gửi Yêu Cầu Đặt Bàn</button>
            </form>
          ) : (
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Họ và tên" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                <input type="tel" placeholder="Số điện thoại" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Loại hình sự kiện (VD: Cưới, Giỗ,...)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                <input type="date" className="w-full p-3 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                 <input type="number" placeholder="Số lượng khách (dự kiến)" min="1" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                 <input type="text" placeholder="Địa điểm tổ chức" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <textarea placeholder="Mô tả chi tiết yêu cầu của bạn" rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"></textarea>
              <button type="submit" className="w-full bg-green-700 text-white p-4 rounded-lg font-bold text-lg hover:bg-green-800 transition-colors">Gửi Yêu Cầu Tư Vấn</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Liên Hệ Với Hương Thảo</SectionTitle>
        <SectionSubtitle>Chúng tôi luôn sẵn lòng lắng nghe và phục vụ. Hãy kết nối với Hương Thảo!</SectionSubtitle>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-stone-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Thông Tin Liên Hệ</h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-green-700 mr-4 mt-1 flex-shrink-0" />
                <span>Số 123, Đường Thanh Niên, Phường Trúc Bạch, Quận Ba Đình, Hà Nội</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-green-700 mr-4 flex-shrink-0" />
                <a href="tel:0987654321" className="hover:text-green-700">0987.654.321</a>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-green-700 mr-4 flex-shrink-0" />
                <a href="mailto:lienhe@huongthaochay.vn" className="hover:text-green-700">lienhe@huongthaochay.vn</a>
              </div>
              <div className="flex items-center">
                <Clock className="w-6 h-6 text-green-700 mr-4 flex-shrink-0" />
                <span>Thứ Hai - Chủ Nhật: 10:00 - 22:00</span>
              </div>
            </div>
          </div>
          <div>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.863981044336!2d105.8437079750085!3d21.03801648061356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba15ec15d17%3A0x620e85c2ce57d040!2zVHLGsOG7nW5nIFRydW5nIEjhu41jIFBo4buVIFRob25nIENodSBWxINuIEFu!5e0!3m2!1svi!2s!4v1689586523171!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsPage = () => {
  return (
    <div className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Tin Tức & Ưu Đãi</SectionTitle>
        <SectionSubtitle>Cập nhật những thông tin mới nhất, các chương trình khuyến mãi hấp dẫn và những bài viết thú vị về ẩm thực chay từ Hương Thảo.</SectionSubtitle>
        <div className="grid md:grid-cols-2 gap-8">
          {MOCK_DATA.news.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
              <img src={item.img} alt={item.title} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-green-700 cursor-pointer">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                </div>
                <a href="#" className="text-green-700 font-semibold mt-4 inline-block">Đọc thêm &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ setPage }) => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Nhà Hàng Chay Hương Thảo</h3>
            <p className="text-gray-400">Mang đến những món chay thanh tịnh, bổ dưỡng và trải nghiệm ẩm thực an yên cho mọi nhà.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage('about'); }} className="text-gray-400 hover:text-white">Về Chúng Tôi</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage('menu'); }} className="text-gray-400 hover:text-white">Thực Đơn</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage('catering'); }} className="text-gray-400 hover:text-white">Dịch Vụ Nấu Cỗ</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage('contact'); }} className="text-gray-400 hover:text-white">Liên Hệ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Thông Tin Liên Hệ</h3>
            <div className="space-y-2 text-gray-400">
              <p>Số 123, Đường Thanh Niên, Ba Đình, Hà Nội</p>
              <p>Email: lienhe@huongthaochay.vn</p>
              <p>Hotline: 0987.654.321</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Đăng Ký Nhận Tin</h3>
            <p className="text-gray-400 mb-4">Nhận thông tin về các ưu đãi và sự kiện mới nhất.</p>
            <form className="flex">
              <input type="email" placeholder="Email của bạn" className="w-full rounded-l-md px-3 py-2 text-gray-800" />
              <button type="submit" className="bg-green-700 px-4 rounded-r-md hover:bg-green-800">Gửi</button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Nhà Hàng Chay Hương Thảo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Chatbot Component
const Chatbot = ({ setPage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const chatboxRef = useRef(null);

    const knowledgeBase = {
        'chào': 'Chào bạn! Tôi là trợ lý ảo của nhà hàng chay Hương Thảo. Tôi có thể giúp gì cho bạn?',
        'thực đơn': 'Bạn có thể xem thực đơn đầy đủ của chúng tôi tại trang Thực Đơn. Một số món đặc sắc là Lẩu Nấm Dưỡng Sinh, Đậu Hũ Sốt Nấm Tứ Xuyên. Bạn có muốn chuyển đến trang thực đơn không?',
        'đặt bàn': 'Để đặt bàn, bạn vui lòng truy cập trang Đặt Bàn / Đặt Cỗ hoặc gọi hotline 0987.654.321. Bạn có muốn chuyển đến trang đặt bàn không?',
        'nấu cỗ': 'Hương Thảo có dịch vụ nấu cỗ chay tận nơi cho các dịp lễ, tiệc. Bạn có thể xem thông tin chi tiết và các set menu tại trang Dịch Vụ Nấu Cỗ. Bạn có muốn xem ngay không?',
        'địa chỉ': 'Nhà hàng Hương Thảo ở tại địa chỉ: Số 123, Đường Thanh Niên, Phường Trúc Bạch, Quận Ba Đình, Hà Nội.',
        'giờ mở cửa': 'Nhà hàng mở cửa từ 10:00 sáng đến 22:00 tối tất cả các ngày trong tuần ạ.',
        'liên hệ': 'Bạn có thể liên hệ với chúng tôi qua hotline 0987.654.321 hoặc email lienhe@huongthaochay.vn.',
        'cảm ơn': 'Rất vui được hỗ trợ bạn! Chúc bạn một ngày an lành!',
    };

    const addMessage = (text, sender) => {
        setMessages(prev => [...prev, { text, sender }]);
    };
    
    useEffect(() => {
        if (isOpen) {
            addMessage('Chào bạn! Tôi là trợ lý ảo của nhà hàng chay Hương Thảo. Bạn cần hỗ trợ thông tin gì ạ? (VD: thực đơn, đặt bàn, nấu cỗ, địa chỉ)', 'bot');
        } else {
            setMessages([]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        addMessage(inputValue, 'user');
        const userInput = inputValue.toLowerCase();
        let botResponse = 'Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Để được hỗ trợ tốt nhất, bạn vui lòng gọi hotline 0987.654.321 nhé.';
        
        for (const key in knowledgeBase) {
            if (userInput.includes(key)) {
                botResponse = knowledgeBase[key];
                break;
            }
        }
        
        setTimeout(() => {
            addMessage(botResponse, 'bot');
            if (userInput.includes('thực đơn')) {
                addMessage(<button onClick={() => { setPage('menu'); setIsOpen(false); }} className="text-blue-500 underline">Đến trang Thực Đơn</button>, 'bot');
            }
            if (userInput.includes('đặt bàn')) {
                 addMessage(<button onClick={() => { setPage('booking'); setIsOpen(false); }} className="text-blue-500 underline">Đến trang Đặt Bàn</button>, 'bot');
            }
            if (userInput.includes('nấu cỗ')) {
                 addMessage(<button onClick={() => { setPage('catering'); setIsOpen(false); }} className="text-blue-500 underline">Đến trang Dịch Vụ Cỗ</button>, 'bot');
            }
        }, 1000);

        setInputValue('');
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
                <div className="bg-green-800 text-white p-4 flex justify-between items-center rounded-t-lg">
                    <h3 className="font-bold">Hỗ trợ trực tuyến</h3>
                    <button onClick={() => setIsOpen(false)}><X size={20}/></button>
                </div>
                <div ref={chatboxRef} className="h-80 bg-white p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200 flex rounded-b-lg">
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Nhập câu hỏi của bạn..." 
                        className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button type="submit" className="bg-green-700 text-white px-4 rounded-r-md hover:bg-green-800">
                        <Send size={20}/>
                    </button>
                </form>
            </div>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="bg-green-700 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-green-800 transition-transform hover:scale-110"
            >
                {isOpen ? <X size={32}/> : <MessageCircle size={32} />}
            </button>
        </div>
    );
};


export default function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    document.title = 'Nhà Hàng Chay Hương Thảo';
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={setPage} />;
      case 'menu':
        return <MenuPage />;
      case 'catering':
        return <CateringServicePage />;
      case 'about':
        return <AboutPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'booking':
        return <BookingPage />;
      case 'contact':
        return <ContactPage />;
      case 'news':
        return <NewsPage />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="bg-white font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&display=swap');
          body { font-family: 'Quicksand', sans-serif; }
          .animate-fade-in-down { animation: fadeInDown 1s ease-out forwards; }
          .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
          .animate-slide-in-left { animation: slideInLeft 1s ease-out forwards; }
          .animate-slide-in-right { animation: slideInRight 1s ease-out forwards; }
          .animation-delay-300 { animation-delay: 300ms; }
          @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
          
          .chatbot-window {
            position: absolute;
            bottom: 80px; /* Position above the button */
            right: 0;
            width: 350px;
            max-width: 90vw;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            transform: scale(0.95) translateY(10px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s ease-out;
            transform-origin: bottom right;
          }
          .chatbot-window.open {
            transform: scale(1) translateY(0);
            opacity: 1;
            visibility: visible;
          }
        `}
      </style>
      <Header setPage={setPage} activePage={page} />
      <main>
        {renderPage()}
      </main>
      <Footer setPage={setPage} />
      <Chatbot setPage={setPage} />
    </div>
  );
}
