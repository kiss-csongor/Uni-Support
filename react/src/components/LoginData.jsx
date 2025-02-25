const LoginData = ({
    user,
    formData,
    authData,
    isEditing,
    isButtonDisabled,
    handleEditClick,
    handleChange,
    handleAuthChange,
    authDataCorrect,
    handleLoginDataValidation,
    handlePasswordValidation,
  }) => {
    return (
        <div className="max-w-3xl mx-auto backdrop-blur-md rounded-lg shadow-xl">
        <div className="px-6 py-8 sm:p-10 border-solid border-[3px] rounded-[1rem]">
          <h2 className=" text-3xl font-extrabold text-gray-100 text-center mb-8">Belépési adatok</h2>
          <div className="space-y-6">
            <div className="bg-white/75 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Felhasználónév</p>
              {isEditing ? (
                <input
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                  placeholder="TestUser"
                />
              ) : (
                <p className={`mt-1 text-lg font-semibold ${user?.user.username ? "text-gray-900" : "text-gray-900/20"}`}>
                    {user?.user.username ? user.user.username : "TestUser"}
                </p>
              )}
            </div>
            <div className="bg-white/75 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Email cím</p>
              {isEditing ? (
                <input
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                  placeholder="teszt@gmail.com"
                />
              ) : (
                <p className={`mt-1 text-lg font-semibold ${user?.user.email ? "text-gray-900" : "text-gray-900/20"}`}>
                {   user?.user.email ? user.user.email : "teszt@gmail.com"}
                </p>
              )}
            </div>
            <div className="relative bg-white/75 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Új jelszó</p>
              {isEditing ? (
                <div className="relative">
                  <input
                    id="new_password"
                    value={authData.new_password}
                    onChange={handleAuthChange}
                    className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none pr-10"
                    placeholder="Password123"
                    type="password"
                  />
                  <span 
                    className="text-2xl absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                    onMouseEnter={(e) => e.target.previousSibling.type = "text"}
                    onMouseLeave={(e) => e.target.previousSibling.type = "password"}
                  >
                    🔒
                  </span>
                </div>
              ) : (
                <p className={`mt-1 text-lg font-semibold ${authData.new_password ? "text-gray-900" : "text-gray-900/20"}`}>
                    {authData?.new_password ? "•".repeat(authData.new_password.length) : "Password123"}
                </p>
              )}
            </div>
            <div className="relative bg-white/75 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Új jelszó ismét</p>
              {isEditing ? (
                <div className="relative">
                  <input
                    id="password_again"
                    value={authData.password_again}
                    onChange={handleAuthChange}
                    className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none pr-10"
                    placeholder="Password123"
                    type="password"
                  />
                  <span 
                    className="text-2xl absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                    onMouseEnter={(e) => e.target.previousSibling.type = "text"}
                    onMouseLeave={(e) => e.target.previousSibling.type = "password"}
                  >
                    🔒
                  </span>
                </div>
              ) : (
                <p className={`mt-1 text-lg font-semibold ${authData.password_again ? "text-gray-900" : "text-gray-900/20"}`}>
                    {authData?.password_again ? "•".repeat(authData.password_again.length) : "Password123"}
                </p>
              )}
            </div>
            {authDataCorrect && (
              <div className="relative bg-green-400 p-4 rounded-lg">
                <p className="text-md font-medium text-gray-500">Jelenlegi jelszó</p>
                  <div className="relative">
                    <input
                      id="old_password"
                      value={authData.old_password}
                      onChange={handleAuthChange}
                      className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none pr-10"
                      type="password"
                    />
                    <span 
                      className="text-2xl absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                      onMouseEnter={(e) => e.target.previousSibling.type = "text"}
                      onMouseLeave={(e) => e.target.previousSibling.type = "password"}
                    >
                      🔒
                    </span>
                  </div>
              </div>
            )}
            {!authDataCorrect ? (
              <div className="flex justify-center space-x-4">
                {!isEditing ? (
                  <button
                    onClick={handleEditClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Adatok módosítása
                  </button>
                ) : (
                  <button
                    onClick={handleLoginDataValidation}
                    className="bg-yellow-300 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    disabled={isButtonDisabled}
                  >
                    Adatok ellenőrzése
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center space-y-4">
                <h2>Adatainak frissítéséhez írja be a jelenlegi jelszavát!</h2>
                <button
                  onClick={handlePasswordValidation}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  disabled={isButtonDisabled}
                >
                  Adatok mentése
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default LoginData ;