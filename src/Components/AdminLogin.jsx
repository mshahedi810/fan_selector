import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const ADMIN_USER = "admin";
  const ADMIN_PASS = "391371";

  const handleLoginSuccess = () => {
    const expireTime = Date.now() + 10 * 60 * 1000; 
    localStorage.setItem("adminLoggedIn", "true");
    localStorage.setItem("adminExpire", expireTime);
    onLoginSuccess();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      handleLoginSuccess();
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      {/* Box - Glass Effect */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-slate-200 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 rounded-2xl flex flex-col gap-5 animate-fadeIn"
      >
        <h1 className="text-3xl font-extrabold text-center text-white drop-shadow-lg">
          ورود مدیر
        </h1>

        <div className="flex flex-col gap-2">
          <label className="text-white">نام کاربری</label>
          <input
            type="text"
            className="p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-blue-300"
            placeholder="نام کاربری را وارد کنید"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white">رمز عبور</label>
          <input
            type="password"
            className="p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-blue-300"
            placeholder="رمز عبور را وارد کنید"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-lg transition-all font-bold tracking-wide"
        >
          ورود
        </button>
      </form>

      {/* Error Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ورود ناموفق</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>لطفاً از صحت نام کاربری و رمز عبور اطمینان حاصل کنید.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>بستن</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
