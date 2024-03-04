import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { downloadExcel } from 'react-export-table-to-excel';
import { requestGetPengumuman } from '../../api/pengumuman/services/requestGetPengumuman';
import Table from './Table/Index';
import ButtonIcon from '../../components/buttons/icon/ButtonIcon';
import SearchBasic from '../../components/searchs/SearchBasic';
import TippyDefault from '../../components/tippys/default/TippyDefault';
import BreadcrumbsDefault from '../../components/breadcrumbs/BreadcrumbsDefault';
interface PengumumanList {
  id_pengumuman: string;
  pendaftaran: {
    id_pendaftaran: string;
    nama_lengkap: string;
    email: string;
    kursus: {
      id_kursus: string;
      nama_kursus: string;
    };
  };
  nilai_test: string;
  nilai_interview: string;
  nilai_rata_rata: string;
  hasil_pengumuman: string;
}

const Pengumuman: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    pengumumanList: [] as PengumumanList[],
    initialPengumumanList: [] as PengumumanList[],
    searchQuery: '' as string,
  });

  const { pengumumanList, initialPengumumanList, searchQuery } = state;

  useEffect(() => {
    dispatch(setPageTitle('Admin | Pengumuman'));

    requestGetPengumuman().then((response: PengumumanList[]) => {
      setState((prevState) => ({ ...prevState, pengumumanList: response, initialPengumumanList: response }));
    });
  }, [dispatch]);

  const filterPengumumanList = useCallback(
    debounce((query: string) => {
      const filteredData = initialPengumumanList.filter((item) => item?.pendaftaran?.nama_lengkap.toLowerCase().includes(query.toLowerCase()));
      setState((prevState) => ({ ...prevState, pengumumanList: filteredData }));
    }, 500),
    [initialPengumumanList]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setState((prevState) => ({ ...prevState, searchQuery: query }));
    filterPengumumanList(query);
  };

  const recordLaporanPengumuman = () => {
    return initialPengumumanList.map((item: any, index: number) => {
      return {
        index: index + 1,
        nama_lengkap: item?.pendaftaran?.nama_lengkap,
        email: item?.pendaftaran?.email,
        kursus: item?.pendaftaran?.kursus?.nama_kursus,
        nilai_test: item?.nilai_test,
        nilai_interview: item?.nilai_interview,
        nilai_rata_rata: item?.nilai_rata_rata,
        hasil_pengumuman: item?.hasil_pengumuman,
      };
    });
  };

  const handlePrintLaporanPengumuman = () => {
    downloadExcel({
      fileName: 'Laporan Pengumuman Pendaftar Kursus',
      sheet: 'react-export-table-to-excel',
      tablePayload: {
        header: ['No', 'Nama Lengkap', 'Email Pendaftar', 'Kursus Yang Dipilih', 'Nilai Test', 'Nilai Interview', 'Nilai Rata-Rata', 'Hasil Pengumuman'],
        body: recordLaporanPengumuman(),
      },
    });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Pengumuman"
        menus={[
          {
            label: 'Pengumuman',
            link: '/pengumuman',
            icon: 'mdi:announcement',
          },
        ]}
      />

      <div className="flex justify-between items-center mt-10">
        <SearchBasic value={searchQuery} placeholder="Cari Nama Lengkap Pendaftar..." onChange={handleSearch} width="w-1/2" />
        <div className="flex gap-3">
          <Link to={'/pengumuman/tambah-pengumuman'}>
            <TippyDefault content="Tambah Pengumuman">
              <ButtonIcon icon="ic:baseline-plus" backgroundColor="btn-primary" />
            </TippyDefault>
          </Link>
          <TippyDefault content="Cetak Laporan Barang Masuk">
            <ButtonIcon icon="mdi:printer" backgroundColor="btn-success" onClick={handlePrintLaporanPengumuman} />
          </TippyDefault>
          <TippyDefault content="Refresh Halaman">
            <ButtonIcon icon="material-symbols:refresh" backgroundColor="btn-info" onClick={handleRefresh} />
          </TippyDefault>
        </div>
      </div>

      <div className="mt-5">
        <Table pengumuman={pengumumanList} />
      </div>
    </>
  );
};

export default Pengumuman;
