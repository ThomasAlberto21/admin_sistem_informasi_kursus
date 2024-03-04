import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { requestGetAllUsers } from '../../api/users/services/requestGetAllUsers';
import { requestGetPengajar } from '../../api/pengajar/services/requestGetPengajar';
import { requestGetKursus } from '../../api/kursus/services/requestGetKursus';
import { requestGetPendaftarKursus } from '../../api/pendaftarKursus/services/requestGetPendaftarKursus';
import IconArrowLeft from '../../components/Icons/IconArrowLeft';

const Dashboard: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [pengajar, setPengajar] = useState([]);
  const [kursus, setKursus] = useState([]);
  const [pendaftarKursus, setPendaftarKursus] = useState([]);

  useEffect(() => {
    dispatch(setPageTitle('Admin | Dashboard'));

    requestGetAllUsers().then((res: any) => {
      setUsers(res);
    });

    requestGetPengajar().then((res: any) => {
      setPengajar(res);
    });

    requestGetKursus().then((res: any) => {
      setKursus(res);
    });

    requestGetPendaftarKursus().then((res: any) => {
      setPendaftarKursus(res);
    });
  }, [dispatch]);

  const totalUsers = users.length ? users.length : 0;
  const totalPengajar = pengajar.length ? pengajar.length : 0;
  const totalKursus = kursus.length ? kursus.length : 0;
  const totalPendaftarKursus = pendaftarKursus.length ? pendaftarKursus.length : 0;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
        {/* Users */}
        <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
          <div className="flex justify-between">
            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Users</div>
          </div>
          <div className="flex items-center mt-5">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{totalUsers} Users</div>
          </div>
          <div className="flex items-center font-semibold mt-5">
            <IconArrowLeft className="ltr:mr-2 rtl:ml-2 shrink-0" />
            Data Users
          </div>
        </div>

        {/* Pengajar */}
        <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
          <div className="flex justify-between">
            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Pengajar</div>
          </div>
          <div className="flex items-center mt-5">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {totalPengajar} Pengajar </div>
          </div>
          <div className="flex items-center font-semibold mt-5">
            <IconArrowLeft className="ltr:mr-2 rtl:ml-2 shrink-0" />
            Data Pengajar
          </div>
        </div>

        {/* Kursus */}
        <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
          <div className="flex justify-between">
            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Kursus</div>
          </div>
          <div className="flex items-center mt-5">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {totalKursus} Kursus </div>
          </div>
          <div className="flex items-center font-semibold mt-5">
            <IconArrowLeft className="ltr:mr-2 rtl:ml-2 shrink-0" />
            Data Kursus
          </div>
        </div>

        {/* Pendaftar Kursus */}
        <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
          <div className="flex justify-between">
            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Pendaftar Kursus</div>
          </div>
          <div className="flex items-center mt-5">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {totalPendaftarKursus} Pendaftar Kursus</div>
          </div>
          <div className="flex items-center font-semibold mt-5">
            <IconArrowLeft className="ltr:mr-2 rtl:ml-2 shrink-0" />
            Data Pendaftar Kursus
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
