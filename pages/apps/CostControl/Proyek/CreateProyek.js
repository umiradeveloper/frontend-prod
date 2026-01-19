import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../../Component/PageHeaderVms";
import { Col, Row } from "react-bootstrap";
import ShowCode from "@/shared/showcode/showcode";
import { Fragment, useState } from "react";



const CreateProyek = () => { 
	const [valueRab, setValueRab] = useState();
	const [valueRap, setValueRap] = useState();
	const handleChangeRab = (e) => {
		let val = e.target.value.replace(/[^\d]/g, ""); // hanya angka
		val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
		setValueRab(val);
	};
	const handleChangeRap = (e) => {
		let val = e.target.value.replace(/[^\d]/g, ""); // hanya angka
		val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
		setValueRap(val);
	};
    return(
		<Fragment>
        <Seo title={"Form Proyek"} />
			<PageHeaderVms title="Form Proyek" item="Cost Control" active_item="Proyek" />
			{/* <LoadersSimUmira open={loader} /> */}
			<Row>
				<Col xl={12}>
					<ShowCode title="Form Proyek" customCardClass="custom-card" customCardBodyClass="" >
						<Row>
							<Col xl={12} className="rounded-3">
								<div className="row gy-2 pb-3">
									<Col xl={12}>
										<label htmlFor="kode-proyek" className="form-label ">Kode Proyek <span style={{ color: "red" }}>*</span> :</label>
										<input type="text" className={`form-control`} id="kode_proyek" placeholder="Kode Proyek" />
									</Col>
									<Col xl={12}>
										<label htmlFor="nama-proyek" className="form-label ">Nama Proyek <span style={{ color: "red" }}>*</span> :</label>
										<input type="text" className={`form-control`} id="nama_proyek" placeholder="Nama Proyek" />
									</Col>

									<Col xl={12}>
										<label htmlFor="desc-proyek" className="form-label ">Deskripsi Proyek <span style={{ color: "red" }}>*</span> :</label>
										<textarea rows={4} type="text" className={`form-control`} id="desc_proyek" placeholder="Deskripsi Proyek" />
									</Col>
									<Col xl={12}>
										<label htmlFor="nama-proyek" className="form-label ">Total RAB (Rincian Anggaran Biaya) <span style={{ color: "red" }}>*</span> :</label>
										<input type="text" className={`form-control`} id="rab" placeholder="Rincian Anggaran Biaya" onChange={handleChangeRab} value={valueRab ? `Rp ${valueRab}` : ""} />
									</Col>
									<Col xl={12}>
										<label htmlFor="nama-proyek" className="form-label ">Total RAP (Rincian Anggaran Proyek) <span style={{ color: "red" }}>*</span> :</label>
										<input type="text" className={`form-control`} id="rap" placeholder="Rincian Anggaran Proyek" onChange={handleChangeRap} value={valueRap ? `Rp ${valueRap}` : ""} />
									</Col>
                                </div>
                            </Col>
                        </Row>
                    </ShowCode>
                </Col>
            </Row>
        
       </Fragment>
    )
}
CreateProyek.layout = "ContentlayoutVms";
export default CreateProyek;