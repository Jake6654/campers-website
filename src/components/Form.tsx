import { FaInstagram, FaYoutube } from "react-icons/fa";

const Form: React.FC = () => {
  return (
    <section className="container mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* left: contact info */}
      <div className="space-y-6 text-gray-700">
        {/* email */}
        <p className="flex items-center text-lg">
          <span className="font-semibold mr-2">Email:</span>
          <a
            href="mailto:uvakiso24@gmail.com"
            className="text-blue-600 underline hover:text-blue-900"
          >
            thecampersministry@gmail.com
          </a>
        </p>

        {/* Group name */}
        <p className="text-xl font-medium">The Camper Ministry</p>

        {/* address */}
        <div className="space-y-1">
          <p>test1</p>
          <p>Fairfax VA 220181</p>
          <p>United States</p>
        </div>

        {/* social icon*/}
        <div className="flex space-x-4 text-2xl text-red-600">
          <a
            href="https://www.instagram.com/uvakiso?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-red-800"
          >
            <FaInstagram />
          </a>
          {/* <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-red-800"
          > */}
          <FaYoutube />
          {/* </a> */}
        </div>
      </div>

      {/* right: contact form */}
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Your Name:
          </label>
          <input
            id="name"
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="이름을 입력해주세요"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email Address:
          </label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 font-medium">
            Message:
          </label>
          <textarea
            id="message"
            rows={6}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="캠펄스후원이나 사역에 관심 있으신 분은 언제든지 이메일로 문의해 주세요!"
          />
        </div>

        <button
          type="submit"
          className="inline-block bg-blue-600 text-white font-semibold rounded-lg px-8 py-3 hover:bg-blue-700 transition duration-500"
        >
          SEND MESSAGE
        </button>
      </form>
    </section>
  );
};

export default Form;
