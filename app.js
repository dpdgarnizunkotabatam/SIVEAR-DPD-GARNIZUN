const URL_API =
"https://script.google.com/macros/s/XXXX/exec";

document.getElementById("menuBtn").onclick=function(){

const m=document.getElementById("menu");

m.style.display=
m.style.display=="block"?"none":"block";

}

function showHome(){

document.getElementById("content").innerHTML=`
<h2>DPD Garnizun Kota Batam</h2>
`;

}

function showPersuratan(){

document.getElementById("content").innerHTML=`

<h2>Verifikasi Dokumen</h2>

<p>Masukkan Nomor Dokumen Untuk Memeriksa Keaslian Dokumen</p>

<input id="nomor">

<button onclick="cariSurat()">
🔍 Search
</button>

<div id="hasil"></div>

`;

}

async function cariSurat(){

let nomor=document.getElementById("nomor").value;

let res=await fetch(
URL_API+
'?type=surat&nomor='+
nomor
);

let data=await res.json();

document.getElementById("hasil").innerHTML=`

<h3>${data.nomor}</h3>

<button onclick="window.open('${data.pdf}')">

📄 Tampil Dokumen

</button>

`;

}

function showSertifikat(){

document.getElementById("content").innerHTML=`

<h2>Verifikasi E-Sertifikat</h2>

<input id="nomor">

<button onclick="cariSertifikat()">
🔍 Search
</button>

<div id="hasil"></div>

`;

}

async function cariSertifikat(){

let nomor=document.getElementById("nomor").value;

let res=await fetch(
URL_API+
'?type=sertifikat&nomor='+
nomor
);

let data=await res.json();

document.getElementById("hasil").innerHTML=`

<h3>${data.nomor}</h3>

<button onclick="window.open('${data.pdf}')">

🏆 Tampil E-Sertifikat

</button>

`;

}

function showAnggota(){

document.getElementById("content").innerHTML=`

<h2>Verifikasi Kartu Anggota</h2>

<input id="nomor">

<button onclick="cariAnggota()">
🔍 Search
</button>

<div id="hasil"></div>

`;

}

async function cariAnggota(){

let nomor=document.getElementById("nomor").value;

let res=await fetch(
URL_API+
'?type=anggota&nomor='+
nomor
);

let data=await res.json();

document.getElementById("hasil").innerHTML=`

<h3>${data.nomor}</h3>

<button onclick="window.open('${data.pdf}')">

🪪 Tampil Kartu Anggota

</button>

<a href="${data.pdf}" download>

<button>

⬇ Download Kartu

</button>

</a>

`;

}
