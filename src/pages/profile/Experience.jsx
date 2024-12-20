import Title from "../../component/Title/Title";
import Biz from "../../assets/img/biztikpii.png";
import MALL from "../../assets/img/mall.png";
import DashboardAdmin from "../../assets/img/dashboard.png";
import DashboardGroup from "../../assets/img/dashboard2.png";
import GROUP from "../../assets/img/group.png";
import GREMASYEDIT from "../../assets/img/SystemEditGremsy.png";
import MUSIC from "../../assets/img/MUSIC.png";

const Data = [
  {
    Icon: "https://camo.githubusercontent.com/f93e05694a6f01f2f6a37713a454a942442a5ff2b33083891096a6f7e57842f8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2532333230323332612e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642",
  },
  {
    Icon: "https://camo.githubusercontent.com/29d02b3669d6450d67e043cf5909e740dcb94c1e2306d88ac48b15b4ec55dc65/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176617363726970742d2532333332333333302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d253233463744463145",
  },
  {
    Icon: "https://camo.githubusercontent.com/d4ff95c6c85e810b4acfe5dbf01bf2b44680cf75945b21a7e5438c87b473f2c6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6578742d626c61636b3f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6578742e6a73266c6f676f436f6c6f723d7768697465",
  },
  {
    Icon: "https://camo.githubusercontent.com/e01b1cfdcc52e26519db194c2a7b4b93eafe7a614a0dab69cfe967864a8f1119/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f657870726573732e6a732d2532333430346435392e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d65787072657373266c6f676f436f6c6f723d253233363144414642",
  },
  {
    Icon: "https://camo.githubusercontent.com/d4cfec9550517aa67567e29843e3880ebf50bd7eeceafcd3b82875f17c9f564e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f747970657363726970742d2532333030374143432e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d74797065736372697074266c6f676f436f6c6f723d7768697465",
  },

  {
    Icon: "https://camo.githubusercontent.com/c9a85f6869aa992f1500dd9d4d4bdff7d405605292ca152587394c1f92552d4f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f646f636b65722d2532333064623765642e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d646f636b6572266c6f676f436f6c6f723d7768697465",
  },
  {
    Icon: "https://camo.githubusercontent.com/dba3dfd2738d8ef9cda9409fb0b4e6edb41483f05ec5f81a1000accdf066f09a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d55492d2532333030383143422e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6d7569266c6f676f436f6c6f723d7768697465",
  },
  {
    Icon: "https://camo.githubusercontent.com/6eff46a364eba690cb91a9f40084d97f96bf95699f3cb7722125dc1dc324fde1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a57542d626c61636b3f7374796c653d666f722d7468652d6261646765266c6f676f3d4a534f4e253230776562253230746f6b656e73",
  },

  {
    Icon: "https://camo.githubusercontent.com/8477a50d7210f0f3bf15fbe5b44809296b75f2101a2927818599d72c8ea72cef/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732d3644413535463f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465",
  },
  {
    Icon: "https://camo.githubusercontent.com/873c09f11f469258183d6e64e34c12195f5f7f3d311b4c7a1461339a7255ee00/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4157532d2532334646393930302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d616d617a6f6e2d617773266c6f676f436f6c6f723d7768697465",
  },
  {
    Icon: "https://camo.githubusercontent.com/ec9b2bbaccf6915a29050ce24c10cd9b481b0c41b0bf5194add3e69f49a9be3c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f6e676f44422d2532333465613934622e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6f6e676f6462266c6f676f436f6c6f723d7768697465",
  },
  {
    Icon: "https://camo.githubusercontent.com/38ce4d8be94d27406f2989b56efec7cdc5e2c2d6509600746fede440245c5afa/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6d7973716c2d3434373941312e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6d7973716c266c6f676f436f6c6f723d7768697465",
  },
  {
    Icon: "https://camo.githubusercontent.com/e31233448c414211b0ccee1366e11e12b2bda7667c21eb2bc7f0aeae9fa24da2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f63686172742e6a732d4635373838442e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d63686172742e6a73266c6f676f436f6c6f723d7768697465",
  },
  {
    Icon: "https://camo.githubusercontent.com/e3aef779877ecfad97fc1e213d3c449a685e6766c0c7fdca210802d4a1f59302/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f536f636b65742e696f2d626c61636b3f7374796c653d666f722d7468652d6261646765266c6f676f3d736f636b65742e696f266261646765436f6c6f723d303130313031",
  },
  {
    Icon: "https://camo.githubusercontent.com/f538d9a749f7c49325cb8264739fecac0280f8ff1375937e7095737ef97d9048/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d526561637425323051756572792d4646343135343f7374796c653d666f722d7468652d6261646765266c6f676f3d72656163742532307175657279266c6f676f436f6c6f723d7768697465",
  },
  {
    Icon: "https://camo.githubusercontent.com/d4d9d935f85b68223a3514c6a889ea3ed6a77afb5f560c05baa1a1b168077830/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f68746d6c352d2532334533344632362e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465",
  },
];
const DataProject = [
  {
    img: Biz,
    name: "Affiliate Marketing",
  },
  {
    img: MALL,
    name: "Website E-commerce",
  },
  {
    img: DashboardAdmin,
    name: "System Admin Page",
  },
  {
    img: GROUP,
    name: "Team Points Calculation System",
  },
  {
    img: DashboardGroup,
    name: "Business Expense Management Page",
  },

  {
    img: GREMASYEDIT,
    name: "Drone Device Adjustment System",
  },

  {
    img: MUSIC,
    name: "Website Sound Community",
  },
];

const EXPERIENCE = () => {
  return (
    <div className="p-16 text-gray-200 w-full flex flex-col justify-start items-start ">
      <div className="flex flex-col gap-36">
        <div className="flex flex-col gap-8">
          {" "}
          <Title content={"SKILL"}></Title>{" "}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full h-auto justify-start items-center gap-4 rounded-md">
            {Data.map((item, index) => {
              return (
                <div
                  data-aos="flip-left"
                  key={index} // Thêm key để tránh cảnh báo React
                  className=" col-span-1 w-full h-40 flex justify-center items-center rounded bg-gray-100 overflow-hidden"
                >
                  <img
                    className=" hover:scale-105 cursor-pointer hover:bg-green-300 w-full h-full object-contain"
                    src={item?.Icon}
                    alt="Default avatar"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {" "}
          <Title content={"EXPERIENCE"}></Title>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-8">
            {DataProject.map((item, index) => {
              return (
                <div
                  key={index} // Thêm key để tránh lỗi React
                  data-aos="fade-up-right"
                  className="flex flex-col items-center justify-center gap-4"
                >
                  <img
                    className="rounded-xl border object-cover 
            transition-[object-position] duration-1000 ease-in-out 
            hover:object-contain cursor-pointer 
            w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]"
                    src={item?.img}
                    alt={item?.name} // Thêm alt để cải thiện accessibility
                  />
                  <span className="text-center text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                    {item?.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EXPERIENCE;
