const UserData = ({
    user,
    formData,
    isEditing,
    isButtonDisabled,
    handleEditClick,
    handleChange,
    handleUserDataValidation,
  }) => {
    return (
        <div className="max-w-3xl mx-auto backdrop-blur-md rounded-lg shadow-xl">
        <div className="px-6 py-8 sm:p-10 border-solid border-[3px] rounded-[1rem]">
          <h2 className=" text-3xl font-extrabold text-gray-100 text-center mb-8">Felhasználói adatok</h2>
          <div className="space-y-6">
            <div className="bg-white/75 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Név</p>
              {isEditing ? (
                <input
                  id="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                  placeholder="Kiss Gyula"
                />
              ) : (
                <p className={`mt-1 text-lg font-semibold ${user?.full_name ? "text-gray-900" : "text-gray-900/20"}`}>
                    {user?.full_name ? user.full_name : "Kiss Gyula"}
                </p>
              )}
            </div>
            <div className="bg-white/75 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Telefonszám</p>
              {isEditing ? (
                <input
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                  placeholder="+36301112233"
                />
              ) : (
                <p className={`mt-1 text-lg font-semibold ${user?.phone_number ? "text-gray-900" : "text-gray-900/20"}`}>
                {   user?.phone_number ? user.phone_number : "+36301112233"}
                </p>
              )}
            </div>
            <div className="bg-white/75 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Neptun kód</p>
              {isEditing ? (
                <input
                  id="neptun_code"
                  value={formData.neptun_code}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                  placeholder="AAA111"
                />
              ) : (
                <p className={`mt-1 text-lg font-semibold ${user?.neptun_code ? "text-gray-900" : "text-gray-900/20"}`}>
                    {user?.neptun_code ? user.neptun_code : "AAA111"}
                </p>
              )}
            </div>
            <div className="bg-white/75 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Anyja neve</p>
              {isEditing ? (
                <input
                  id="mothers_name"
                  value={formData.mothers_name}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                  placeholder="Szabó Ilona"
                />
              ) : (
                <p className={`mt-1 text-lg font-semibold ${user?.mothers_name ? "text-gray-900" : "text-gray-900/20"}`}>
                    {user?.mothers_name ? user.mothers_name : "Szabó Ilona"}
                </p>
              )}
            </div>
            <div className="bg-white/75 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Születési dátum</p>
              {isEditing ? (
                <input
                  id="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                  placeholder="1999-09-19"
                />
              ) : (
                <p className={`mt-1 text-lg font-semibold ${user?.birth_date ? "text-gray-900" : "text-gray-900/20"}`}>
                    {user?.birth_date ? user.birth_date : "1999-09-19"}
                </p>
              )}
            </div>
            <div className="bg-white/75 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Születési hely</p>
              {isEditing ? (
                <input
                  id="birth_place"
                  value={formData.birth_place}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                  placeholder="Doboz"
                />
              ) : (
                <p className={`mt-1 text-lg font-semibold ${user?.birth_place ? "text-gray-900" : "text-gray-900/20"}`}>
                    {user?.birth_place ? user.birth_place : "Doboz"}
                </p>
              )}
            </div>
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
                  onClick={handleUserDataValidation}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  disabled={isButtonDisabled}
                >
                  Adatok mentése
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default UserData;