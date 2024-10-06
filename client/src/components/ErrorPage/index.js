import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Xin lỗi, không thể tìm thấy trang web truy cập.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}