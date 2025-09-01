import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import { layout1, layout10, layout11, layout12, layout2, layout3, layout4, layout5, layout6, layout7, layout8, layout9 } from "@/shared/data/prismdata/formsdata";
import ShowCode from "@/shared/showcode/showcode";
import PageHeaderVms from "./Component/PageHeaderVms";
import dynamic from "next/dynamic";
import { Selectoption1 } from "@/shared/data/forms/select2data";
import FormIndividu from "./FormComponent/FormIndividu";
import FormMenengah from "./FormComponent/FormMenengah";
import FormBesar from "./FormComponent/FormBesar";
import LoadersSimUmira from "./Component/LoaderSimUmira";
import Swal from "sweetalert2";
import axios from "axios";
import { FilePond } from "react-filepond";
const Select = dynamic(() => import("react-select"), { ssr: false });

const FormVms = () => {
        const [selectedOptions, setSelectedOptions] = useState([{ value: "kecil", label: "Kecil/Non BU" },{ value: "menengah", label: "Menengah/BU" }, { value: "besar", label: "Besar/BU" }]);
		const [selectedOptionsKategori, setSelectedOptionsKategori] = useState([{ value: "Pondasi", label: "Pondasi" },{ value: "Pekerjaan tanah", label: "Pekerjaan tanah" },{ value: "Struktur", label: "Struktur" }, { value: "Arsitektur", label: "Arsitektur" }, { value: "Mep", label: "Mep" }, { value: "Interior", label: "Interior" }, { value: "Facaad", label: "Facaad" }, { value: "Landscape", label: "Landscape" }, { value: "Pekerjaan tanah", label: "Infrastruktur" }, { value: "Lain Lainnya", label: "Lain Lainnya" }]);
		const [selectedOptionsKlasifikasi, setSelectedOptionsKlasifikasi] = useState([{ value: "Pabrik", label: "Pabrik" },{ value: "Distributor", label: "Distributor" }, { value: "Agent", label: "Agent" }, { value: "Toko / Retail", label: "Toko / Retail" }, { value: "Mandor / Pemborong", label: "Mandor / Pemborong" }, { value: "Sub Kontraktor", label: "Sub Kontraktor" }, { value: "Main Kontraktor", label: "Main Kontraktor" }, { value: "Workshop", label: "Workshop" }, { value: "Rental", label: "Rental" }, { value: "Lain Lain", label: "Lain Lain" }]);
        const [selectKualifikasiUsaha, setSelectKualifikasiUsaha] = useState(null);
		const [loader, setLoader] = useState();
		const [form, setForm] = useState([]);
		 const [files, setFiles] = useState([]);
		 const [vendorData, setVendorData] = useState({
			nama_perusahaan:'',
			id_kualifikasi_usaha:'',
			klasifikasi_usaha:'',
			alamat_perusahaan:'',
			kategori:'',
			spesialis:'',
			nama_pic:'',
			email_pic:'',
			no_hp_pic:'',
			nama_direktur:'',
			email_direktur:'',
			no_hp_direktur:'',
			website:''
		 })
        // const handleSelectChange = (selected) => {
        //     // Define your maximum selection limit (e.g., 2 in this example)
        //     const maxSelections = 3;
    
        //     if (selected && selected.length <= maxSelections) {
        //         setSelectedOptions(selected);
        //     }
        // };
        const handleSelectKualifikasiUsaha = async(select) => {
            // console.log(select.value);
            // setSelectKualifikasiUsaha(select.value);
			setVendorData({...vendorData, id_kualifikasi_usaha: select.value});
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			setLoader(true);
			try {
				const response = await axios.get(apiUrl+"/access-document/all-id-kualifikasi", {
					headers:{
						"Content-Type":"application/json",
						"Authorization": "Bearer "+localStorage.getItem("token")
					},
					params:{
						id: select.value
					}
				});
				const data = response.data.data;
				if(data){
					console.log(data);
					
					setForm(data);
					// setTableData(userArr);
					setLoader(false);
				}
				
			} catch (error) {
				console.log(error);
				// setError(error.message);
				setLoader(false);
				swalAlert(error.message, error.status, "error");
			}

        }

		const getKualifikasiUsaha = async () => {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			setLoader(true);
			try {
				const response = await axios.get(apiUrl+"/mst-kualifikasi/all", {
					headers:{
						"Content-Type":"application/json",
						"Authorization": "Bearer "+localStorage.getItem("token")
					}
				});
				const data = response.data.data;
				if(data){
					// console.log(data);
					const kualifikasiArr = [];
					for await (const user of data){
					
						kualifikasiArr.push({
							value: user.id_mst_kualifikasi,
							label: user.kualifikasi,
							
						})
					}
					setSelectedOptions(kualifikasiArr);
					// setTableData(userArr);
					setLoader(false);
				}
				
			} catch (error) {
				console.log(error);
				// setError(error.message);
				setLoader(false);
				swalAlert(error.message, error.status, "error");
			}
		}

		const handleUploadUpdate = (id_dokumen, items) => {
			setFiles(prev => {
				const exists = prev.find(f => f.id_dokumen === id_dokumen);

				if (exists) {
					// update the items for that document
					return prev.map(f =>
						f.id_dokumen === id_dokumen ? { ...f, items } : f
					);
				} else {
					// add new entry
					return [...prev, { id_dokumen, items }];
				}
			});
		}

		const handleSubmit = async() => {
			// console.log(vendorData);
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			setLoader(true);
			try {
				const response = await axios.post(apiUrl+"/vms/create-vendor", vendorData,{
					headers:{
						"Content-Type":"application/json",
						"Authorization": "Bearer "+localStorage.getItem("token")
					}
				});
				const data = response.data.data;
				if(data){
					// console.log(data);
					
					// setSelectedOptions(kualifikasiArr);
					// setTableData(userArr);
					// swalAlert("Pengajuan Vendor Terkirim", "Register Vendor", "success");
					const upload = await uploadDaftarVendor(data.id_vendor);
					if(upload){
						setLoader(false);
						swalAlert("Pengajuan Vendor Terkirim", "Register Vendor", "success");
					}
					
				}
				
			} catch (error) {
				console.log(error);
				// setError(error.message);
				setLoader(false);
				swalAlert(error.message, error.status, "error");
			}
		}
		const uploadDaftarVendor = async(idVendor) => {
			console.log(files);
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			// setLoader(true);
			try {
				files.map(async(item) => {
					// console.log(item.items);
					const formData = new FormData();
					formData.append("id_vendor", idVendor);
					formData.append("id_dokumen", item.id_dokumen);
					// formData.append("files[]", item.items);
					item.items.forEach(fileObj => {
						// if item.items comes from FilePond → fileObj.file
						formData.append("files", fileObj.file || fileObj);
					});
					const response = await axios.post(apiUrl+"/vms/create-vendor/upload", formData,{
						headers:{
							"Content-Type": "multipart/form-data",
							"Authorization": "Bearer "+localStorage.getItem("token")
						}
					});
					console.log(response.data)
					if(!response.data.success){
						return false;
					}
				});
				
				return true;
				
			} catch (error) {
				console.log(error);
				// setError(error.message);
				// setLoader(false);
				// swalAlert(error.message, error.status, "error");
			}
		}

		const swalAlert = (message, title, icon) => {
				let timerInterval;
		
				Swal.fire({
					title: title,
					html: message,
					icon: icon,
					timer: 5000,
					timerProgressBar: true,
					didOpen: () => {
						Swal.showLoading();
					},
					willClose: () => {
						clearInterval(timerInterval);
					},
				}).then((result) => {
					/* Read more about handling dismissals below */
					if (result.dismiss === Swal.DismissReason.timer) {
						console.log("I was closed by the timer");
					}
				});
			}

        useEffect(() => {
			getKualifikasiUsaha()
		},[selectKualifikasiUsaha])
	return (
		<>
			<Seo title={"Form Pendaftaran"} />
			<PageHeaderVms title="Form Pendaftaran Vendor" item="VMS List" active_item="Form Pendaftaran" />
			<LoadersSimUmira open={loader} />
			<Row>
				<Col xl={12}>
					<ShowCode title="Form Pendaftaran Vendor" customCardClass="custom-card" customCardBodyClass="" >
						<Row>
							<Col xl={12} className="rounded-3">
								<div className="row gy-2 pb-3">
									<Col xl={12}>
										<label htmlFor="contact-address-firstname" className="form-label ">Nama Perusahaan :</label>
										<input type="text" className="form-control" id="contact-address-firstname" placeholder="Nama Perusahaan" onChange={(e) => setVendorData({...vendorData, nama_perusahaan: e.target.value})}/>
									</Col>
                                    <Col xl={6}>
										<label htmlFor="contact-address-firstname" className="form-label ">Kualifikasi Usaha:</label>
										{/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                                        <Select name="state" options={selectedOptions} className="basic-multi-select " isSearchable menuPlacement='auto' classNamePrefix="Select2" onChange={handleSelectKualifikasiUsaha}/>
									</Col>
                                    <Col xl={6}>
										<label htmlFor="contact-address-firstname" className="form-label ">Klasifikasi Usaha:</label>
										{/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Klasifikasi Usaha" /> */}
										<Select name="state" options={selectedOptionsKlasifikasi} className="basic-multi-select " isSearchable menuPlacement='auto' classNamePrefix="Select2" onChange={(e) => setVendorData({...vendorData, klasifikasi_usaha: e.value})}/>
									</Col>
									<Col xl={12}>
										<label htmlFor="contact-address-lastname" className="form-label ">Alamat Perusahaan :</label>
										<textarea type="text" className="form-control" id="contact-address-lastname" placeholder="Alamat Perusahaan" onChange={(e) => setVendorData({...vendorData, alamat_perusahaan: e.target.value})} />
									</Col>
                                    <Col xl={6}>
										<label htmlFor="contact-address-firstname" className="form-label ">Kategori :</label>
										{/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Kategori" /> */}
										<Select name="state" options={selectedOptionsKategori} className="basic-multi-select " isSearchable menuPlacement='auto' classNamePrefix="Select2" onChange={(e) => setVendorData({...vendorData, kategori: e.value})}/>
									</Col>
                                    <Col xl={6}>
										<label htmlFor="contact-address-firstname" className="form-label ">Spesialisasi :</label>
										<input type="text" className="form-control" id="contact-address-firstname" placeholder="Spesialisasi" onChange={(e) => setVendorData({...vendorData, spesialis: e.target.value})} />
									</Col>
                                    
                                    <Col xl={6}>
										<label htmlFor="contact-address-firstname" className="form-label ">Nama PIC :</label>
										<input type="text" className="form-control" id="contact-address-firstname" placeholder="Nama PIC" onChange={(e) => setVendorData({...vendorData, nama_pic: e.target.value})} />
									</Col>
                                    <Col xl={6}>
										<label htmlFor="contact-address-firstname" className="form-label ">Nama Direktur :</label>
										<input type="text" className="form-control" id="contact-address-firstname" placeholder="Nama Direktur" onChange={(e) => setVendorData({...vendorData, nama_direktur: e.target.value})} />
									</Col>
                                    <Col xl={6}>
										<label htmlFor="contact-address-firstname" className="form-label ">Email PIC :</label>
										<input type="text" className="form-control" id="contact-address-firstname" placeholder="Email PIC" onChange={(e) => setVendorData({...vendorData, email_pic: e.target.value})} />
									</Col>
                                    <Col xl={6}>
										<label htmlFor="contact-address-firstname" className="form-label ">Email Direktur :</label>
										<input type="email" className="form-control" id="contact-address-firstname" placeholder="Email Direktur" onChange={(e) => setVendorData({...vendorData, email_direktur: e.target.value})} />
									</Col>
                                    
                                    <Col xl={6}>
										<label htmlFor="contact-address-firstname" className="form-label ">Nomor Handphone PIC :</label>
										<input type="text" className="form-control" id="contact-address-firstname" placeholder="No Handphone PIC" onChange={(e) => setVendorData({...vendorData, no_hp_pic: e.target.value})} />
									</Col>
                                    
                                    <Col xl={6}>
										<label htmlFor="contact-address-firstname" className="form-label ">Nomor Handphone Direktur :</label>
										<input type="text" className="form-control" id="contact-address-firstname" placeholder="Nomor Handphone Direktur" onChange={(e) => setVendorData({...vendorData, no_hp_direktur: e.target.value})} />
									</Col>
                                    <Col xl={12}>
										<label htmlFor="contact-address-firstname" className="form-label ">Website :</label>
										<input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" onChange={(e) => setVendorData({...vendorData, website: e.target.value})} />
									</Col>
                                   
								</div>
                               
								<hr/>
								<div className="row gy-2 pt-3">
									{form.map((item, index) => (
										<Col key={index} xl={6}>
											<h6 className="mb-3">{item.dokumen.nama_dokumen} :</h6>
											<Row>
												<Col xl={12}>
													<Card className="custom-card">
														<Card.Header>
															<div className="card-title">
																Upload {item.dokumen.nama_dokumen}
															</div>
														</Card.Header>
														<Card.Body>
															<FilePond className="multiple-filepond"
																files={files.find(f => f.id_dokumen === item.dokumen.id_mst_dokumen)?.items || []}
																onupdatefiles={(items) => handleUploadUpdate(item.dokumen.id_mst_dokumen, items)}
																allowMultiple={true}
																maxFiles={3}
																// server="/api"
																name="files" /* sets the file input name, it's filepond by default */
																labelIdle='Drag & Drop your file here or click '
															/>
														</Card.Body>
													</Card>
												</Col>
											</Row>
										</Col> 
									))}
								</div>
								<div className="text-center mt-4">
									<button className="btn btn-primary btn-wave" onClick={handleSubmit}>Submit</button>
								</div>
							</Col>
						</Row>
					</ShowCode>
				</Col>
			</Row>

		</>
	);
};
FormVms.layout = "ContentlayoutVms";

export default FormVms;