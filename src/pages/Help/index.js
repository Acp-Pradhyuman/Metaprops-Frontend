import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HomePageFooter from "../../components/Home/HomePageFooter";
import { handleApiCall } from "../../api";
import { endpoints } from "../../utils/endpoints";
import { setHelp } from "../../redux/Slice/GetTerms";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import parser from "html-react-parser";
import * as moment from "moment";

const Help = () => {
	const [help, setHelp] = useState([]);
	const [toggle, setToggle] = useState(false);
	const [accordion, setAccordion] = useState();

	const catData = help.filter(
		(data) =>
			data.help_guidance_category_id &&
			data.help_guidance_category_id.help_guidance_category_name === "The User:"
	);
	const catData2 = help.filter(
		(data) =>
			data.help_guidance_category_id &&
			data.help_guidance_category_id.help_guidance_category_name ===
				"The creator:"
	);
	useEffect(() => {
		handlerequest();
	}, []);
	const handlerequest = async () => {
		const response = await handleApiCall("get", `${endpoints.getHelp}`);
		if (response.data.success) {
			setHelp(response?.data?.data);
		}
	};

	const handleToggle = (id, e) => {
		setToggle(!toggle);
		setAccordion(e.target.id);
	};

	return (
		<>
			<Header />
			<section>
				<div className="container">
					<div className="main-panel">
						<div className="content-wrapper">
							<div className="content-wrapper-box">
								<div className="inner-content-wrapper">
									<div className="dashboard-top-area mb-0">
										<div className="edit-creators-btn edit-creators-btn2"></div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<h2>Help and Guidance</h2>

											<div className="date-update-wrap mb-3 mt-2">
												<strong>Last Updated: </strong>
												{moment(catData.updatedAt).format("MMMM DD, YYYY")}
											</div>
											<div className="help-faq-wrapper help-faq-wrapper2 mt-4">
												<div>
													<h4 className="mt-2">The User:</h4>
													<div className="panel-group" id="accordion">
														{/* <h4 className="mt-2">The User:</h4> */}
														{catData.length > 0 &&
															catData.map((data, index) => {
																return (
																	<div
																		key={data._id}
																		className="panel-group"
																		id="accordion"
																	>
																		<div
																			className="panel panel-default"
																			onClick={(e) => handleToggle(data._id, e)}
																			style={{ cursor: "pointer" }}
																		>
																			<div
																				className="panel-heading"
																				id={data._id}
																				style={{ width: "100%" }}
																			>
																				<h3
																					className="panel-title"
																					id={data._id}
																				>
																					<a id={data._id}>
																						{data.question}

																						{toggle && data._id == accordion ? (
																							<i
																								class="fa fa-angle-up"
																								aria-hidden="true"
																								id={data._id}
																							></i>
																						) : (
																							<i
																								class="fa fa-angle-down"
																								aria-hidden="true"
																								id={data._id}
																							></i>
																						)}
																					</a>
																				</h3>
																			</div>
																			{toggle && (
																				<div
																					id={data._id}
																					className={`${
																						data._id === accordion
																							? "panel-collapse in collapse show"
																							: "panel-collapse in collapse"
																					}`}
																					// className="panel-collapse in collapse show"
																				>
																					<div
																						className="panel-body"
																						style={{ width: "100%" }}
																					>
																						<p>
																							{parser(
																								`${data && data?.answer}`
																							)}
																						</p>
																					</div>
																				</div>
																			)}
																		</div>
																	</div>
																);
															})}
														<br />
														<h4 className="mt-2">The Creator:</h4>
														{catData2.length > 0 &&
															catData2.map((data, index) => {
																return (
																	<div
																		key={data._id}
																		className="panel-group"
																		id="accordion"
																	>
																		<div
																			className="panel panel-default"
																			onClick={(e) => handleToggle(data._id, e)}
																			style={{ cursor: "pointer" }}
																		>
																			<div
																				className="panel-heading"
																				id={data._id}
																				style={{ width: "100%" }}
																			>
																				<h3
																					className="panel-title"
																					id={data._id}
																				>
																					<a id={data._id}>
																						{data.question}

																						{toggle && data._id == accordion ? (
																							<i
																								class="fa fa-angle-up"
																								aria-hidden="true"
																								id={data._id}
																							></i>
																						) : (
																							<i
																								class="fa fa-angle-down"
																								aria-hidden="true"
																								id={data._id}
																							></i>
																						)}
																					</a>
																				</h3>
																			</div>
																			{toggle && (
																				<div
																					id={data._id}
																					className={`${
																						data._id === accordion
																							? "panel-collapse in collapse show"
																							: "panel-collapse in collapse"
																					}`}
																					// className="panel-collapse in collapse show"
																				>
																					<div
																						className="panel-body"
																						style={{ width: "100%" }}
																					>
																						<p>
																							{parser(
																								`${data && data?.answer}`
																							)}
																						</p>
																					</div>
																				</div>
																			)}
																		</div>
																	</div>
																);
															})}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<HomePageFooter />
		</>
	);
};

export default Help;
