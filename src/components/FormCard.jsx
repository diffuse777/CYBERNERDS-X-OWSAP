
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Problem statements feature removed

const fadeSlide = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
};

function FormCard() {
	// State hooks
		const MAX_TEAMS = 60; // Adjust capacity here
		const [isFull, setIsFull] = useState(false);
		const [teamsCount, setTeamsCount] = useState(0);
		const [college, setCollege] = useState({ name: "" });
			const [members, setMembers] = useState([
				{ name: "", regNo: "", phone: "", dept: "", residency: "Dayscholar", hostelName: "", roomNo: "", role: "Team Leader" },
				{ name: "", regNo: "", phone: "", dept: "", residency: "Dayscholar", hostelName: "", roomNo: "", role: "Team Member" },
				{ name: "", regNo: "", phone: "", dept: "", residency: "Dayscholar", hostelName: "", roomNo: "", role: "Team Member" },
				{ name: "", regNo: "", phone: "", dept: "", residency: "Dayscholar", hostelName: "", roomNo: "", role: "Team Member" },
				{ name: "", regNo: "", phone: "", dept: "", residency: "Dayscholar", hostelName: "", roomNo: "", role: "Team Member" },
			]);
			const [teamName, setTeamName] = useState("");
			const [leaderEmail, setLeaderEmail] = useState("");
			const [transactionId, setTransactionId] = useState("");
			const [paymentFile, setPaymentFile] = useState(null);
			const [paymentPreview, setPaymentPreview] = useState(null);
            // Problem statements removed
			const [errors, setErrors] = useState({});
			const [submitted, setSubmitted] = useState(false);
			const [duplicate, setDuplicate] = useState(false);

	// Handlers
	useEffect(() => {
		try {
			const regs = JSON.parse(localStorage.getItem("registrations") || "[]");
			const count = Array.isArray(regs) ? regs.length : 0;
			setTeamsCount(count);
			setIsFull(count >= MAX_TEAMS);
		} catch {}
		const interval = setInterval(() => {
			try {
				const regs = JSON.parse(localStorage.getItem("registrations") || "[]");
				const count = Array.isArray(regs) ? regs.length : 0;
				setTeamsCount(count);
				setIsFull(count >= MAX_TEAMS);
			} catch {}
		}, 2000);
		return () => clearInterval(interval);
	}, []);
	const handleCollegeChange = (e) => {
		setCollege({ ...college, [e.target.name]: e.target.value });
	};

	const handleMemberChange = (idx, field, value) => {
		const updated = [...members];
		if (field === 'role') {
			// Enforce only one Team Leader at a time
			if (value === 'Team Leader') {
				// Set selected member as Team Leader, others as Team Member
				updated.forEach((m, i) => {
					if (i === idx) {
						m.role = 'Team Leader';
					} else {
						m.role = 'Team Member';
					}
				});
			} else {
				// If switching away from Team Leader, just update this member
				updated[idx].role = 'Team Member';
			}
		} else {
			updated[idx][field] = value;
		}
		setMembers(updated);
	};

			const addMember = () => {
				if (members.length < 5) {
					setMembers([...members, { name: "", regNo: "", role: "Team Member" }]);
				}
			};

			const removeMember = (idx) => {
				if (members.length > 2) {
					setMembers(members.filter((_, i) => i !== idx));
				}
			};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setPaymentFile(file);
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => setPaymentPreview(reader.result);
			reader.readAsDataURL(file);
		} else {
			setPaymentPreview(null);
		}
	};

// Problem statements selection removed

				const validate = () => {
					const errs = {};
					// college removed
					if (!leaderEmail) errs.leaderEmail = "Team leader email is required.";
					if (!teamName) errs.teamName = "Team name is required.";
				if (!transactionId) errs.transactionId = "Transaction ID is required.";
				if (!paymentFile) errs.paymentFile = "Payment screenshot is required.";
				if (members.length < 2) errs.members = "At least 2 members required.";
				let leaderCount = 0;
				members.forEach((m, idx) => {
					if (!m.name) errs[`memberName${idx}`] = "Name required.";
					if (!m.regNo) errs[`memberRegNo${idx}`] = "Reg. No. required.";
					if (!m.dept) errs[`memberDept${idx}`] = "Department required.";
					if (!m.phone) errs[`memberPhone${idx}`] = "Phone required.";
					if (m.residency === 'Hostel') {
						if (!m.hostelName) errs[`memberHostelName${idx}`] = "Hostel name required.";
						if (!m.roomNo) errs[`memberRoomNo${idx}`] = "Room number required.";
					}
					if (m.role === "Team Leader") leaderCount++;
				});
				if (leaderCount !== 1) errs.leader = "Exactly one team leader required.";
					// Problem statement selection is optional when none are listed
				return errs;
			};

const handleSubmit = (e) => {
		e.preventDefault();
		if (isFull) {
			setSubmitted(false);
			setErrors({ ...errors, capacity: "Registration is full." });
			return;
		}
		setSubmitted(false);
		setDuplicate(false);
		const errs = validate();
		setErrors(errs);
		if (Object.keys(errs).length === 0) {
			// Simulate duplicate check
			if (false) {
				setDuplicate(true);
			} else {
				// Persist registration to localStorage
				try {
					const existing = JSON.parse(localStorage.getItem("registrations") || "[]");
					const leaderIndex = members.findIndex(m => m.role === 'Team Leader');
					const leader = {
						name: leaderIndex !== -1 ? members[leaderIndex].name : "",
						team: teamName,
						email: leaderEmail,
					};
					const payload = {
						leader,
						leaderEmail,
						payment: { txn: transactionId, screenshot: paymentPreview || null },
						members: members.map(m => ({
							name: m.name,
							reg: m.regNo,
							dept: m.dept || "",
							phone: m.phone || "",
							residency: m.residency || "Dayscholar",
							hostelName: m.residency === 'Hostel' ? (m.hostelName || "") : "",
							roomNo: m.residency === 'Hostel' ? (m.roomNo || "") : "",
							role: m.role,
						})),
						createdAt: new Date().toISOString(),
					};
					localStorage.setItem("registrations", JSON.stringify([...existing, payload]));
				} catch (err) {
					console.error("Failed to save registration:", err);
				}
				setSubmitted(true);
					// Optionally reset form
					// setCollege({ name: "" });
				// setMembers([
				// 	{ name: "", regNo: "", role: "Team Leader" },
				// 	{ name: "", regNo: "", role: "Team Member" },
				// ]);
				// setLeaderEmail("");
				// setTransactionId("");
				// setPaymentFile(null);
				// setPaymentPreview(null);
                // problem statements removed
			}
		}
	};

			return (
				<div className="min-h-screen bg-[#0d0d0d] text-white font-inter flex flex-col justify-center m-0 p-0 pl-0 relative overflow-x-hidden w-full" style={{width:'100%'}}>
					<div className="absolute inset-0 z-0 pointer-events-none">
						<div className="matrix-bg" />
						<div className="absolute inset-0 bg-gradient-to-br from-[#1affc6]/10 via-[#00e0ff]/10 to-transparent blur-2xl animate-glowPulse" />
					</div>
					<div className="flex flex-col md:flex-row gap-8 items-stretch justify-start flex-1 p-0 m-0 w-full px-4 md:px-8" style={{ minHeight: '90vh', position: 'relative', zIndex: 20 }}>
	                            {/* Main Registration Card */}
								<motion.form
									initial="hidden"
									animate="visible"
									onSubmit={handleSubmit}
					className={`flex-[2] basis-2/3 min-w-0 bg-[#10151c] shadow-xl p-4 md:p-10 flex flex-col gap-8 border border-[#1affc6]/40 backdrop-blur-xl ${isFull ? 'opacity-70 pointer-events-none' : ''}`}
								>
						<motion.h2
							className="font-orbitron text-3xl md:text-4xl mb-4 text-neon-green drop-shadow-neon text-center"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
						>
							Team Registration
						</motion.h2>
					{/* Team Details */}
					<div className="flex flex-col gap-4 mb-2">
					<div className="flex-1 min-w-0">
						<label className="block font-semibold mb-1">Team Name<span className="text-neon-green">*</span></label>
						<input
							value={teamName}
							onChange={e => setTeamName(e.target.value)}
							className="w-full min-w-0 px-4 py-2 rounded bg-[#181c23] border border-[#1affc6]/40 focus:border-neon-green focus:ring-neon-green outline-none transition text-white"
							required
						/>
					</div>
						</div>
		{/* College removed */}
		{errors.teamName && <div className="text-red-400 text-xs mb-2">{errors.teamName}</div>}

						{/* Team Members Section */}
						<div className="mb-2">
							<div className="font-semibold text-neon-green mb-1 text-lg">Team Members<span className="text-white">*</span></div>
							<div className="text-xs text-white/60 mb-2">Exactly one Team Leader is required. Selecting Team Leader for one member will set all others to Team Member.</div>
							<div className="text-xs text-white/80 mb-3">Teams registered: <span className="text-neon-green font-bold">{teamsCount}</span> / {MAX_TEAMS}</div>
							<div className="flex flex-col gap-3">
								<AnimatePresence>
									{members.map((m, idx) => (
										<motion.div
											key={idx}
											initial={{ opacity: 0, x: 40 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -40 }}
											transition={{ duration: 0.3 }}
								className="flex flex-col gap-2 bg-[#181c23] border border-[#1affc6]/20 rounded-xl p-2 relative"
										>
								<div className="flex flex-col md:flex-row gap-2">
									<input
										placeholder="Name"
										value={m.name}
										onChange={e => handleMemberChange(idx, 'name', e.target.value)}
										className="flex-1 min-w-0 px-2 py-1 rounded bg-[#10151c] border border-[#1affc6]/20 focus:border-neon-green focus:ring-neon-green outline-none text-white"
										required
									/>
                                        <input
                                            placeholder="Reg. No."
                                            value={m.regNo}
                                            onChange={e => handleMemberChange(idx, 'regNo', e.target.value)}
                                            className="flex-1 min-w-0 px-2 py-1 rounded bg-[#10151c] border border-[#1affc6]/20 focus:border-neon-blue focus:ring-neon-blue outline-none text-white"
                                            required
                                        />
                                        <input
                                            placeholder="Department"
                                            value={m.dept || ''}
                                            onChange={e => handleMemberChange(idx, 'dept', e.target.value)}
                                            className="flex-1 min-w-0 px-2 py-1 rounded bg-[#10151c] border border-[#1affc6]/20 focus:border-neon-green focus:ring-neon-green outline-none text-white"
                                            required
                                        />
									<input
										placeholder="Phone"
										value={m.phone || ''}
										onChange={e => handleMemberChange(idx, 'phone', e.target.value)}
										className="flex-1 min-w-0 px-2 py-1 rounded bg-[#10151c] border border-[#1affc6]/20 focus:border-neon-green focus:ring-neon-green outline-none text-white"
										required
									/>
								</div>
											<select
												value={m.role}
												onChange={e => handleMemberChange(idx, 'role', e.target.value)}
												className="flex-1 min-w-0 px-2 py-1 rounded bg-[#10151c] border border-[#1affc6]/20 focus:border-neon-green focus:ring-neon-green outline-none text-white"
											>
												{/* Disable Team Leader option if another leader already exists */}
												{(() => {
													const leaderIndex = members.findIndex(mem => mem.role === 'Team Leader');
													const leaderExists = leaderIndex !== -1 && leaderIndex !== idx;
													return (
														<>
															<option value="Team Leader" disabled={leaderExists}>Team Leader</option>
															<option value="Team Member">Team Member</option>
														</>
													);
												})()}
											</select>
								<div className="flex flex-col md:flex-row gap-2">
									<select
										value={m.residency || 'Dayscholar'}
										onChange={e => handleMemberChange(idx, 'residency', e.target.value)}
										className="flex-1 min-w-0 px-2 py-1 rounded bg-[#10151c] border border-[#1affc6]/20 focus:border-neon-green focus:ring-neon-green outline-none text-white"
									>
										<option value="Dayscholar">Dayscholar</option>
										<option value="Hostel">Hostel</option>
									</select>
									{(m.residency === 'Hostel') && (
										<>
											<input
												placeholder="Hostel Name"
												value={m.hostelName || ''}
												onChange={e => handleMemberChange(idx, 'hostelName', e.target.value)}
												className="flex-1 min-w-0 px-2 py-1 rounded bg-[#10151c] border border-[#1affc6]/20 focus:border-neon-blue focus:ring-neon-blue outline-none text-white"
												required
											/>
											<input
												placeholder="Room No."
												value={m.roomNo || ''}
												onChange={e => handleMemberChange(idx, 'roomNo', e.target.value)}
												className="flex-1 min-w-0 px-2 py-1 rounded bg-[#10151c] border border-[#1affc6]/20 focus:border-neon-blue focus:ring-neon-blue outline-none text-white"
												required
											/>
										</>
									)}
								</div>
                                            {/* Remove member button disabled; fixed 5 members */}
										</motion.div>
									))}
								</AnimatePresence>
					{/* Add Member button removed; fixed 5 members */}
								{errors.members && <div className="text-red-400 text-xs mt-2">{errors.members}</div>}
								{errors.leader && <div className="text-red-400 text-xs mt-2">{errors.leader}</div>}
								{members.map((_, idx) => (
									<React.Fragment key={idx}>
										{errors[`memberName${idx}`] && <div className="text-red-400 text-xs">Member {idx + 1} Name: {errors[`memberName${idx}`]}</div>}
                                    {errors[`memberRegNo${idx}`] && <div className="text-red-400 text-xs">Member {idx + 1} Reg. No.: {errors[`memberRegNo${idx}`]}</div>}
                                    {errors[`memberDept${idx}`] && <div className="text-red-400 text-xs">Member {idx + 1} Department: {errors[`memberDept${idx}`]}</div>}
							{errors[`memberPhone${idx}`] && <div className="text-red-400 text-xs">Member {idx + 1} Phone: {errors[`memberPhone${idx}`]}</div>}
							{errors[`memberHostelName${idx}`] && <div className="text-red-400 text-xs">Member {idx + 1} Hostel Name: {errors[`memberHostelName${idx}`]}</div>}
							{errors[`memberRoomNo${idx}`] && <div className="text-red-400 text-xs">Member {idx + 1} Room No.: {errors[`memberRoomNo${idx}`]}</div>}
									</React.Fragment>
								))}
							</div>
						</div>

						{/* Team Leader Email */}
						<div className="mb-2">
							<label className="font-semibold mb-2">Team Leader Email<span className="text-neon-green">*</span></label>
							<input
								type="email"
								value={leaderEmail}
								onChange={e => setLeaderEmail(e.target.value)}
								className="w-full min-w-0 px-4 py-2 rounded bg-[#181c23] border border-[#1affc6]/20 focus:border-neon-blue focus:ring-neon-blue outline-none text-white"
								required
							/>
							{errors.leaderEmail && <div className="text-red-400 text-xs mt-2">{errors.leaderEmail}</div>}
						</div>

					{/* Payments */}
					<div className="mb-4">
						<label className="font-semibold mb-2">Payments<span className="text-neon-green">*</span></label>
						<div className="flex gap-4 items-center">
							<img
								id="payment-qr"
								src="/payment-qr.jpg"
								alt="Payment QR"
								className="w-32 h-32 rounded-xl border border-neon-green shadow-glass bg-[#10151c] object-contain"
							/>
							<div className="flex-1 flex flex-col gap-2">
								<label className="block mb-1">Transaction ID<span className="text-neon-green">*</span></label>
								<input
									value={transactionId}
									onChange={e => setTransactionId(e.target.value)}
									className="w-full min-w-0 px-4 py-2 rounded bg-[#10151c] border border-[#1affc6]/20 focus:border-neon-green focus:ring-neon-green outline-none text-white"
									required
								/>
								{errors.transactionId && <div className="text-red-400 text-xs mb-2">{errors.transactionId}</div>}
								<label className="block mb-1">Upload Payment Screenshot<span className="text-neon-green">*</span></label>
								<input
									type="file"
									accept=".jpg,.jpeg,.png"
									onChange={handleFileChange}
									className="w-full min-w-0 mb-2 text-white"
									required
								/>
								{errors.paymentFile && <div className="text-red-400 text-xs mb-2">{errors.paymentFile}</div>}
								{paymentPreview && (
									<img src={paymentPreview} alt="Payment Preview" className="w-16 h-16 rounded-lg border border-neon-blue mt-2" />
								)}
							</div>
						</div>
						{/* Payment Note */}
						<div className="mt-3 rounded-xl border-2 border-accent-red bg-accent-red/10 p-3 text-left">
							<div className="font-orbitron font-bold text-accent-red mb-1">Note</div>
							<ul className="list-disc list-inside text-white/90 text-sm font-jetbrains">
								<li><span className="font-semibold text-neon-green">Pay ₹1,750</span> per team (₹350 × 5 members).</li>
								<li>Paying less than ₹1,750 may lead to <span className="text-accent-red font-semibold">disqualification</span>.</li>
								<li>A <span className="font-semibold">Team Leader</span> or <span className="font-semibold">Team Member</span> should pay ₹1,750 on behalf of the team.</li>
							</ul>
						</div>
					</div>

					{/* Submit Button */}
						<motion.button
							type="submit"
							whileHover={{ scale: 1.05, boxShadow: '0 0 16px #1affc6, 0 0 32px #00e0ff' }}
						className="w-full min-w-0 py-3 rounded-xl bg-[#1affc6]/80 text-[#0d0d0d] font-orbitron text-xl font-bold shadow-glass backdrop-blur-md hover:bg-[#181c23] hover:text-neon-green border border-[#1affc6]/40 transition mt-2"
						disabled={isFull}
							style={{ letterSpacing: '0.05em' }}
						>
							Register
						</motion.button>
					{isFull && (
						<div className="text-accent-red text-center font-orbitron mt-3">Registration is full.</div>
					)}
						{duplicate && (
							<div className="text-red-400 text-sm mt-3">Duplicate entry detected. Each team can only register once.</div>
						)}
						{/* Success Message */}
						<AnimatePresence>
							{submitted && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
								className="flex flex-col items-center mt-8"
								>
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ type: 'spring', stiffness: 300, damping: 10 }}
										className="text-neon-green text-6xl mb-2"
									>
										✓
									</motion.div>
								<div className="font-orbitron text-neon-green text-xl mb-2">Thanks for registering!</div>
								<div className="text-white/80 text-center max-w-xl mb-4">
									Payment verified. Join our official WhatsApp group to receive updates and announcements.
								</div>
								<a
									href="https://chat.whatsapp.com/DPIVlPlMRd1IDKIWqY1z4L?mode=ems_qr_t"
									target="_blank"
									rel="noopener noreferrer"
									className="px-6 py-2 rounded-lg bg-neon-green text-black font-bold border-2 border-neon-green hover:bg-black hover:text-neon-green transition"
								>
									Join WhatsApp Group
								</a>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.form>

                    {/* Problem statements section removed */}
				</div>

				{/* Custom styles for neon and glassmorphism */}
				<style>{`
					.font-orbitron { font-family: 'Orbitron', sans-serif; }
					.font-inter { font-family: 'Inter', sans-serif; }
					.text-neon-green { color: #1affc6; }
					.text-neon-blue { color: #00e0ff; }
					.border-neon-green { border-color: #1affc6; }
					.border-neon-blue { border-color: #00e0ff; }
					.focus\:border-neon-green:focus { border-color: #1affc6; }
					.focus\:border-neon-blue:focus { border-color: #00e0ff; }
					.focus\:ring-neon-green:focus { box-shadow: 0 0 0 2px #1affc6; }
					.focus\:ring-neon-blue:focus { box-shadow: 0 0 0 2px #00e0ff; }
					.shadow-neon-glow { box-shadow: 0 0 32px #1affc6, 0 0 64px #00e0ff; }
					.drop-shadow-neon { filter: drop-shadow(0 0 8px #1affc6); }
					.shadow-glass { box-shadow: 0 8px 32px 0 rgba(26,255,198,0.12); }
					.glassmorphism-card {
						background: rgba(13, 13, 13, 0.92);
						box-shadow: 0 8px 64px 0 #1affc6, 0 0 128px 0 #00e0ff33;
						border-radius: 1.5rem;
					}
					.glassmorphism-box {
						background: rgba(24, 28, 35, 0.85);
						backdrop-filter: blur(8px);
					}
					.border-neon-animated {
						border-image: linear-gradient(90deg, #1affc6, #00e0ff, #1affc6) 1;
						animation: neonBorderAnim 3s linear infinite;
					}
					@keyframes neonBorderAnim {
						0% { border-image-source: linear-gradient(90deg, #1affc6, #00e0ff, #1affc6); }
						50% { border-image-source: linear-gradient(270deg, #00e0ff, #1affc6, #00e0ff); }
						100% { border-image-source: linear-gradient(90deg, #1affc6, #00e0ff, #1affc6); }
					}
					.animate-glowPulse {
						animation: glowPulse 2.5s infinite alternate;
					}
					@keyframes glowPulse {
						0% { filter: drop-shadow(0 0 8px #1affc6) drop-shadow(0 0 16px #00e0ff); }
						100% { filter: drop-shadow(0 0 24px #1affc6) drop-shadow(0 0 48px #00e0ff); }
					}
					.animate-pulseGlow {
						animation: pulseGlow 1.2s infinite alternate;
					}
					@keyframes pulseGlow {
						0% { text-shadow: 0 0 8px #1affc6, 0 0 16px #00e0ff; }
						100% { text-shadow: 0 0 24px #1affc6, 0 0 48px #00e0ff; }
					}
					.matrix-bg {
						pointer-events: none;
						position: absolute;
						top: 0; left: 0; width: 100vw; height: 100vh;
						z-index: 0;
						opacity: 0.08;
						background:
							linear-gradient(to bottom, transparent 50%, rgba(0, 255, 136, 0.1)),
							repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(0, 255, 136, 0.05) 2px, rgba(0, 255, 136, 0.05) 4px),
							repeating-linear-gradient(to bottom, #00FF88 0px, #00FF88 1px, transparent 1px, transparent 20px);
						animation: matrix-move 20s linear infinite;
						background-size: 100% 100%, 4px 100%, 100% 20px;
					}
					@keyframes matrix-move {
						0% { background-position-y: 0; }
						100% { background-position-y: 20px; }
					}
				   `}</style>
			   </div>
	);
}

export default FormCard;
