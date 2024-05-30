import Link from "next/link";

const FooterRegister = () => {
  return (
    <div>
      <div>
        <div>
          <span className="mr-2">Bạn đã có tài khoản?</span>
          <Link href="/login">
            <button className="border-none hover:text-blue-500">
              Đăng nhập
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterRegister;
