import Link from "next/link";

const FooterLogin = () => {
  return (
    <div>
      <div>
        <span className="mr-2">Bạn không có tài khoản?</span>
        <Link href="/register">
          <button className="border-none hover:text-blue-500">Đăng ký</button>
        </Link>
      </div>
    </div>
  );
};

export default FooterLogin;
