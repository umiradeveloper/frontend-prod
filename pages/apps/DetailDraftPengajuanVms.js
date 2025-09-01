import { Select } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Modal, Button, Col } from "react-bootstrap";
const DetailDraftPengajuanVms = ({open, setOpen, openLoader, setOpenLoader}) => {
     const [modalDokumen, setModalDokumen] = useState();
   const LihatDokumen = () =>{
    return(
        <Modal size="lg" show={modalDokumen} onHide={() => setModalDokumen(false)} className="fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <Modal.Header closeButton>
                <h6 className="modal-title" id="exampleModalLabel">Dokumen Upload</h6>
            </Modal.Header>
            <Modal.Body className="">

            </Modal.Body>
            <Modal.Footer className="">
                <Button variant='contained' type="button" className="btn btn-secondary" onClick={() => setModalDokumen(false)}
                    data-bs-dismiss="modal">Close</Button>
           
            </Modal.Footer>
        </Modal>
    )
   }

    return(
        <Modal show={open.open_modal} onHide={() => setOpen({...open, open_modal: false})} className="fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <LihatDokumen />
            <Modal.Header closeButton>
                <h6 className="modal-title" id="exampleModalLabel">Detail Pengajuan</h6>
            </Modal.Header>
            <Modal.Body className="">
                <div className="row gy-2 pb-3">
                    <Col xl={12}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nama Perusahaan :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Nama Perusahaan" value={open.data_detail.nama_perusahaan} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Kualifikasi Usaha:</label>
                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Kualifikasi Usaha" value={open.data_detail.kualifikasi_usaha?.kualifikasi} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Klasifikasi Usaha:</label>
                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Klasifikasi Usaha" /> */}
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Nama Perusahaan" value={open.data_detail.klasifikasi_usaha} disabled/>
                    </Col>
                    <Col xl={12}>
                        <label htmlFor="contact-address-lastname" className="form-label ">Alamat Perusahaan :</label>
                        <textarea type="text" className="form-control" id="contact-address-lastname" placeholder="Alamat Perusahaan" value={open.data_detail.alamat_perusahaan} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Kategori :</label>
                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Kategori" /> */}
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Kategori Perusahaan" value={open.data_detail.kategori} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Spesialisasi :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Spesialisasi" value={open.data_detail.spesialis} disabled/>
                    </Col>
                    
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nama PIC :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Nama PIC" value={open.data_detail.nama_pic} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nama Direktur :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Nama Direktur" value={open.data_detail.nama_direktur} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Email PIC :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Email PIC" value={open.data_detail.email_pic} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Email Direktur :</label>
                        <input type="email" className="form-control" id="contact-address-firstname" placeholder="Email Direktur" value={open.data_detail.email_direktur} disabled/>
                    </Col>
                    
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nomor Handphone PIC :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="No Handphone PIC" value={open.data_detail.no_hp_pic} disabled/>
                    </Col>
                    
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nomor Handphone Direktur :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Nomor Handphone Direktur" value={open.data_detail.no_hp_direktur} disabled/>
                    </Col>
                    <Col xl={12}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Website :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" value={open.data_detail.website} disabled/>
                    </Col>
                    <hr />
                    <Col xl={12}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Dokumen Upload</label>
                    </Col>
                    <hr/>
                    {open.data_detail.vendorDetail?.map((item, index) => (
                        <Col key={index} xl={4}>
                            <label htmlFor="contact-address-firstname" className="form-label ">{item.nama_dokumen}</label>
                            <Button variant="contained" className="btn btn-primary" onClick={() => setModalDokumen(true)}>Lihat Dokumen</Button>
                        </Col>
                    ))}
                    
                </div>
            </Modal.Body>
            <Modal.Footer className="">
                <Button variant='contained' type="button" className="btn btn-secondary" onClick={() => setOpen({...open, open_modal: false})}
                    data-bs-dismiss="modal">Close</Button>
           
            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(DetailDraftPengajuanVms), { ssr: false });