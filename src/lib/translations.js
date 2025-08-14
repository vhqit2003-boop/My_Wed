export const labels = {
  vi: {
    nav_projects:'Dự án', nav_skills:'Kĩ năng', nav_exp:'Kinh nghiệm', nav_contact:'Liên hệ',
    view_projects:'Xem dự án', projects_title:'Dự án nổi bật', skills_title:'Kĩ năng',
    exp_title:'Kinh nghiệm', certs_title:'Chứng chỉ', contact_title:'Liên hệ',
    demo:'Demo', source:'Source', featured:'nổi bật',
    name:'Họ tên', email:'Email', message:'Nội dung', send:'Gửi',
    sent_ok:'Gửi thành công! Mình sẽ phản hồi sớm nhất.', sent_fail:'Gửi thất bại. Vui lòng thử lại.',
    role:'Information Technology Engineer',
    hero_text:'Tôi là một sinh viên đầy nhiệt huyết với niềm đam mê lớn dành cho công nghệ và lập trình…'
  },
  en: {
    nav_projects:'Projects', nav_skills:'Skills', nav_exp:'Experience', nav_contact:'Contact',
    view_projects:'See projects', projects_title:'Featured Projects', skills_title:'Skills',
    exp_title:'Experience', certs_title:'Certificates', contact_title:'Contact',
    demo:'Demo', source:'Source', featured:'featured',
    name:'Full name', email:'Email', message:'Message', send:'Send',
    sent_ok:'Message sent! I will reply soon.', sent_fail:'Failed to send. Please try again.',
    role:'Information Technology Engineer',
    hero_text:"I’m a passionate student who loves technology and programming…"
  }
};

export function tr(lang, key){ return labels[lang]?.[key] ?? key; }

export function getData(lang){
  const PROFILE = {
    name: "Vũ Hải Quân",
    role: tr(lang, 'role'),
    email: "vhq.it.2003@gmail.com",
    phone: "0377541977",
    location: lang==='en' ? "Dong Thanh, Hoc Mon, Ho Chi Minh City" : "Đông Thạnh, Hóc Môn, TP.HCM",
    avatar: "/assets/avatar.jpg",
    linkedin:"https://www.linkedin.com/in/qu%C3%A2n-v%C5%A9-ba2844379/",
    github:"https://github.com/vhqit2003-boop",
    cvUrl:"/mycv.pdf",
  };

  const AVATARS = ["/assets/avatar.jpg","/assets/1.jpg","/assets/2.jpg"];

  let PROJECTS, SKILLS, EXPERIENCE, CERTS;
  if (lang === 'en') {
    PROJECTS = [
      {title:"NetWatch",desc:"Realtime network monitoring (SNMP, Syslog) with alerting.",tags:["PHP","Tailwind","Charts"],demo:"#",repo:"https://github.com/vhqit2003-boop/MY_CV"},
      {title:"SmartFarm IoT",desc:"Environmental sensors and automated control.",tags:["Node","MQTT","Edge"],demo:"#",repo:"https://github.com/vhqit2003-boop/GK_THNCHT"},
      {title:"Frontend UI Kit",desc:"Unified components: dark mode, charts, tables.",tags:["PHP","UI"],demo:"#",repo:"https://github.com/vhqit2003-boop/Demo-EJS"},
    ];
    SKILLS = ["PHP","Laravel","MySQL","Tailwind","Testing","Performance/SEO","Accessibility"];
    EXPERIENCE = [
      {time:"2022 – present",title:"Network/IoT Engineer — Company A",bullets:[
        "Designed & operated LAN/WAN, VLAN segmentation, HA.",
        "IP solutions (L3/VRF), NAT & ACL scenarios.",
        "Built monitoring dashboards and alerting.",
      ]},
      {time:"2020 – 2022",title:"Frontend Developer — Startup B",bullets:[
        "Built SPA with React/TS, optimized CLS & LCP.",
        "Created design system (UI Kit) and CI/CD.",
      ]},
    ];
    CERTS = ["CCNA (2021)","Azure Fundamentals (AZ-900)","IoT Developer (2022)","CompTIA Network+"];
  } else {
    PROJECTS = [
      {title:"NetWatch",desc:"Giám sát mạng realtime (SNMP, Syslog) – cảnh báo.",tags:["PHP","Tailwind","Charts"],demo:"#",repo:"https://github.com/vhqit2003-boop/MY_CV"},
      {title:"SmartFarm IoT",desc:"Cảm biến môi trường, điều khiển tự động.",tags:["Node","MQTT","Edge"],demo:"#",repo:"https://github.com/vhqit2003-boop/GK_THNCHT"},
      {title:"Frontend UI Kit",desc:"Bộ component thống nhất, dark mode, chart, table.",tags:["PHP","UI"],demo:"#",repo:"https://github.com/vhqit2003-boop/Demo-EJS"},
    ];
    SKILLS = ["PHP","Laravel","MySQL","Tailwind","Testing","Performance/SEO","Accessibility"];
    EXPERIENCE = [
      {time:"2022 – nay",title:"Network/IoT Engineer — Công ty A",bullets:[
        "Thiết kế & vận hành mạng LAN/WAN, phân đoạn VLAN, HA.",
        "Giải pháp IP (L3/VRF), NAT & triển khai ACL.",
        "Xây dựng dashboard quan sát & cảnh báo.",
      ]},
      {time:"2020 – 2022",title:"Frontend Developer — Startup B",bullets:[
        "Xây dựng SPA với React/TS, tối ưu CLS & LCP.",
        "Thiết kế hệ thiết kế (UI Kit) & CI/CD.",
      ]},
    ];
    CERTS = ["CCNA (2021)","Azure Fundamentals (AZ-900)","Nhà phát triển IoT (2022)","CompTIA Network+"];
  }

  return { PROFILE, AVATARS, PROJECTS, SKILLS, EXPERIENCE, CERTS };
}
