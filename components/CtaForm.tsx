"use client";
import React, { useState } from "react";
import Button from "./Button";

type TContactFormInput = {
	field: string;
};

const CtaForm = () => {
	const [inputValue, setInputValue] = useState<TContactFormInput | {}>({});
	function inputHandler(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) {
		e.preventDefault;
		let field = (e.target as HTMLInputElement | HTMLTextAreaElement).name;
		let value = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
		setInputValue({ ...inputValue, [field]: value });
	}

	const sendContactForm = async (
		e: React.FormEvent<HTMLFormElement>,
		data: TContactFormInput | {}
	) => {
		e.preventDefault();
		console.log(data);
		fetch("api/contact", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((res) => {
			if (!res.ok) throw new Error("Poruka nije mogla da bude poslata.");
			return res.json();
		});
	};

	return (
		<form
			onSubmit={(e) => sendContactForm(e, inputValue)}
			className="flex flex-col gap-6"
		>
			<div className="relative flex flex-col w-full">
				<input
					className="max-w-full py-3 px-4 peer rounded-2xl bg-secondaryAccent border border-white"
					type="text"
					name="name"
					id="name"
					autoCapitalize="none"
					autoCorrect="off"
					required
					onChange={inputHandler}
				/>
				<label
					className="absolute text-primaryAccent bg-secondaryAccent top-1/2 -translate-y-1/2 left-4 px-2 transition-all duration-200 ease-linear peer-focus:text-sm peer-focus:-top-1"
					htmlFor="name"
				>
					Name
				</label>
			</div>
			<div className="relative flex flex-col w-full">
				<input
					className="max-w-full py-3 px-4 peer rounded-2xl bg-secondaryAccent border border-white"
					type="text"
					name="email"
					id="email"
					autoCapitalize="none"
					autoCorrect="off"
					required
					pattern="[^@]+@[^\.]+\..+"
					onChange={inputHandler}
				/>
				<label
					className="absolute text-primaryAccent bg-secondaryAccent top-1/2 -translate-y-1/2 left-4 px-2 transition-all duration-200 ease-linear peer-focus:text-sm peer-focus:-top-1"
					htmlFor="email"
				>
					Email
				</label>
			</div>
			<div className="relative flex flex-col w-full">
				<textarea
					className="max-w-full py-3 px-4 peer rounded-2xl bg-secondaryAccent border border-white"
					name="message"
					id="message"
					autoCapitalize="none"
					autoCorrect="off"
					required
					title="Please leave a message."
					onChange={inputHandler}
				/>
				<label
					className="absolute text-primaryAccent bg-secondaryAccent top-3 left-4 px-2 transition-all duration-200 ease-linear peer-focus:text-sm peer-focus:-top-3"
					htmlFor="message"
				>
					Message
				</label>
			</div>
			<Button>Get your free audit</Button>
		</form>
	);
};

export default CtaForm;
