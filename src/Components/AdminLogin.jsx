import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [showModal, setShowModal] = useState(false);
=======
  const [showModal, setShowModal] = useState(false)
>>>>>>> f0f6deb2997b72238193b2a3b6b3878acb917d0b

  const ADMIN_USER = "admin";
  const ADMIN_PASS = "391371";

  const handleLoginSuccess = () => {
<<<<<<< HEAD
    const expireTime = Date.now() + 10 * 60 * 1000; 
    localStorage.setItem("adminLoggedIn", "true");
    localStorage.setItem("adminExpire", expireTime);
    onLoginSuccess();
  };
=======
  const expireTime = Date.now() + 10 * 60 * 1000; // 10 دقیقه بعد
  localStorage.setItem("adminLoggedIn", "true");
  localStorage.setItem("adminExpire", expireTime); // زمان انقضا
  onLoginSuccess();
};
>>>>>>> f0f6deb2997b72238193b2a3b6b3878acb917d0b

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
<<<<<<< HEAD
      handleLoginSuccess();
    } else {
      setShowModal(true);
=======
      handleLoginSuccess(); 
    } else {
        setShowModal(true)
>>>>>>> f0f6deb2997b72238193b2a3b6b3878acb917d0b
    }
  };

  return (
<<<<<<< HEAD
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
=======
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
>>>>>>> f0f6deb2997b72238193b2a3b6b3878acb917d0b
          <Modal.Title>ورود ناموفق</Modal.Title>
        </Modal.Header>

        <Modal.Body>
<<<<<<< HEAD
          <p>لطفاً از صحت نام کاربری و رمز عبور اطمینان حاصل کنید.</p>
=======
          <p>لطفا از صحت نام کاربری و رمز عبور اطمینان حاصل کنید.</p>
>>>>>>> f0f6deb2997b72238193b2a3b6b3878acb917d0b
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>بستن</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> f0f6deb2997b72238193b2a3b6b3878acb917d0b
