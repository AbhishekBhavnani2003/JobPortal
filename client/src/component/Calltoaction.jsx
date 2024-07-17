import React from "react";

function Calltoaction() {
  return (
    <div>
      <body className="flex items-center justify-center min-h-screen bg-gray-900" style={{height:'300px'}}>
        <div
          className="relative w-full h-full bg-cover bg-center flex items-center justify-center bg-cover bg-center p-8 my-8 dui-bg-fixed"
          style={{backgroundImage: `url('https://images.unsplash.com/photo-1486042805867-267f2bd4eda9?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`}}
        >
          <div className="p-8 bg-gray-900 bg-opacity-50 text-white/75 rounded-xl shadow-lg text-center w-full max-w-full mx-2">
            <h1 className="text-4xl font-bold mb-4">Join CastFit Today</h1>
            <p className="text-lg mb-8">
            Embrace our community and unlock exclusive benefits with CastFit. Positioned against a dynamic backdrop, this immersive interface invites you to join us and experience a personalized journey toward your dreams.
            </p>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-neutral btn-wide"
            >
             CastFit: Your casting companion
            </a>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Calltoaction;
