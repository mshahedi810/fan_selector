import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false)

  const ADMIN_USER = "admin";
  const ADMIN_PASS = "391371";

  const handleLoginSuccess = () => {
  const expireTime = Date.now() + 10 * 60 * 1000; // 10 دقیقه بعد
  localStorage.setItem("adminLoggedIn", "true");
  localStorage.setItem("adminExpire", expireTime); // زمان انقضا
  onLoginSuccess();
};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      handleLoginSuccess(); 
    } else {
        setShowModal(true)
    }
  };

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-80 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">ورود ادمین</h1>

        <input
          type="text"
          className="border p-2 rounded"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 rounded"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          ورود
        </button>
      </form>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
            <hr/>
          <Modal.Title>ورود ناموفق</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>لطفا از صحت نام کاربری و رمز عبور اطمینان حاصل کنید.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>بستن</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

