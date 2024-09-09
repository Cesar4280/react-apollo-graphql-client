import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

import "./App.css";

import { useState } from "react";
import { Button } from "@mui/material";

import useRooms from "./hooks/useRooms";
import useProjects from "./hooks/useProjects";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

/*
const projects = [
	{ id: 1, name: "Hotel ByHours Las Américas" },
	{ id: 2, name: "Hotel ByHours Astor" },
	{ id: 3, name: "Hotel ByHours Circunvalar" },
	{ id: 4, name: "Motel Carpe Diem Circunvalar" },
	{ id: 5, name: "Motel Carpe Diem Barrio Abajo" },
	{ id: 6, name: "Motel Carpe Diem Barrio Chiquinquira" },
	{ id: 7, name: "Motel Carpe Diem Sincelejo" },
	{ id: 8, name: "Motel El Faraón" }
];

const rooms = [
	{ id: 1, name: "Habitación Suit Presidencial", projectId: 1 },
	{ id: 2, name: "Habitación Suit Ejecutiva", projectId: 1 },
	{ id: 3, name: "Habitación Cabaña Presidencial", projectId: 1 },
	{ id: 4, name: "Habitación Cabaña Ejecutiva", projectId: 1 },
	{ id: 5, name: "Habitación Cuarto Regular", projectId: 1 },
	{ id: 6, name: "Habitación 101", projectId: 2 },
	{ id: 7, name: "Habitación 102", projectId: 2 },
	{ id: 8, name: "Habitación 103", projectId: 2 },
	{ id: 9, name: "Habitación 104", projectId: 2 },
	{ id: 10, name: "Habitación 105", projectId: 2 }
];
*/

export default function App() {
	// USE STATES
	const [projectId, setProjectId] = useState("");
	const [projectRooms, setProjectRooms] = React.useState([]);

	const { projects, loading: loadingProjects } = useProjects();
	const { rooms, loading: loadingRooms } = useRooms(projectId);

	const handleSelectedProject = (event) => {
		console.log(event);
		const updatedProjectId = event.target.value;
		if (projectRooms.length) setProjectRooms([]);
		setProjectId(updatedProjectId);
	};

	const handleSelectedRooms = (event) => {
		console.log(event);

		const { value } = event.target;

		const updatedProjectRooms =
			typeof value === "string" ? value.split(",") : value;

		// On autofill we get a stringified value.
		setProjectRooms(updatedProjectRooms);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!projectId) return console.log("Seleccione un Proyecto");
		if (!projectRooms.length)
			return console.log(
				"Seleccione al menos un area para el proyecto elegido"
			);
		const apoloPayload = {
			projectId: Number.parseInt(projectId),
			listOfRoomId: projectRooms.map((room) => Number.parseInt(room))
		};
		console.log(apoloPayload);
	};

	console.log(`{
  		"listOfprojectId": ${projectRooms
			.map((item) => Number.parseInt(item.split(":")[0]))
			.join(", ")}
	}`);

	return (
		<Box
			component="form"
			sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit}
		>
			<div>
				<FormControl sx={{ m: 3, width: 300 }} size="small">
					<InputLabel id="projectSelectLabel">Proyectos</InputLabel>
					<Select
						labelId="projectSelectLabel"
						id="projectSelect"
						value={projectId}
						label="Proyectos"
						onChange={handleSelectedProject}
					>
						{loadingProjects ? (
							<MenuItem>Loading...</MenuItem>
						) : (
							projects.map((project) => (
								<MenuItem key={project.id} value={project.id}>
									{project.name}
								</MenuItem>
							))
						)}
					</Select>
				</FormControl>
				<FormControl sx={{ m: 3, width: 300 }} size="small">
					<InputLabel id="projectAreasSelectLabel">Areas</InputLabel>
					<Select
						labelId="projectAreasSelectLabel"
						id="projectAreasSelect"
						multiple
						value={projectRooms}
						onChange={handleSelectedRooms}
						input={<OutlinedInput label="Areas" />}
						renderValue={(selected) => {
							console.log("selected:", selected);
							const selectedMap = selected
								.map((item) => item.split(":").pop())
								.join(", ");
							console.log("selectedMap:", selectedMap);
							return selectedMap;
						}}
						MenuProps={MenuProps}
					>
						{loadingRooms ? (
							<MenuItem>Loading...</MenuItem>
						) : (
							rooms.map(({ id, title }) => {
								const personInStringFormat = `${id}:${title}`;
								return (
									<MenuItem
										key={id}
										value={personInStringFormat}
									>
										<Checkbox
											checked={projectRooms.includes(
												personInStringFormat
											)}
										/>
										<ListItemText primary={title} />
									</MenuItem>
								);
							})
						)}
					</Select>
				</FormControl>
			</div>
			<div>
				<Button
					sx={{ m: 3, width: 650 }}
					type="submit"
					color="success"
					variant="contained"
					size="medium"
				>
					Enviar
				</Button>
			</div>
		</Box>
	);
}
