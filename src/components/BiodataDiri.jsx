import "./custom.css";

import Nama from './Nama';
import Foto from './Foto';
import Alamat from './Alamat';
import Skill from './Skill';
import Pendidikan from './Pendidikan';
import Kontak from './Kontak';

function BiodataDiri() {
  return (
    <div className="card">
      <Foto />
      <Nama />
      <Alamat />
      <Pendidikan />
      <Skill />
      <Kontak />
    </div>
  );
}

export default BiodataDiri;
