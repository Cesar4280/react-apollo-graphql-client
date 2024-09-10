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
import useDevices from "./hooks/useDevices";

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
const fakeProjects = [
	{ id: 1, name: "Hotel ByHours Las Américas" },
	{ id: 2, name: "Hotel ByHours Astor" },
	{ id: 3, name: "Hotel ByHours Circunvalar" },
	{ id: 4, name: "Motel Carpe Diem Circunvalar" },
	{ id: 5, name: "Motel Carpe Diem Barrio Abajo" },
	{ id: 6, name: "Motel Carpe Diem Barrio Chiquinquira" },
	{ id: 7, name: "Motel Carpe Diem Sincelejo" },
	{ id: 8, name: "Motel El Faraón" }
];

const fakeRooms = [
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

const fakeDevices = [
	{ id: 1, name: "Termostatus Pro", RoomId: 1 },
	{ id: 2, name: "Interruptor Triple", RoomId: 1 },
	{ id: 3, name: "Camara IoT", RoomId: 1 },
	{ id: 4, name: "Sensor de Cortina", RoomId: 1 },
	{ id: 5, name: "Termostatus Lite", RoomId: 2 },
	{ id: 6, name: "Interruptor Doble", RoomId: 2 },
	{ id: 7, name: "Termostatus Compact", RoomId: 3 },
	{ id: 8, name: "Sensor de Movimiento", RoomId: 3 },
	{ id: 9, name: "Interruptor Simple", RoomId: 3 },
	{ id: 10, name: "Termostatus Simple", RoomId: 4 },
	{ id: 11, name: "Termostatus Lite", RoomId: 5 },
	{ id: 12, name: "Cerradura Orbita", RoomId: 6 }
];
*/

export default function App() {
	// USE STATES
	const [projectId, setProjectId] = useState("");
	const [projectRoomId, setProjectRoomId] = useState("");
	const [roomDevices, setRoomDevices] = React.useState([]);
	// APOLLO QUERY HOOKS
	const { projects, loading: loadingProjects } = useProjects();
	const { rooms, loading: loadingRooms } = useRooms(projectId);
	const { devices, loading: loadingDevices } = useDevices(projectRoomId);

	const clearSelectedDevices = () => setRoomDevices([]);
	const clearSelectedRoom = () => setProjectRoomId("");

	const handleSelectedProject = (event) => {
		console.log(event);
		const updatedProjectId = event.target.value;
		if (roomDevices.length) {
			clearSelectedDevices();
			projectRoomId.length && clearSelectedRoom();
		}
		setProjectId(updatedProjectId);
	};

	const handleSelectedRoom = (event) => {
		console.log(event);
		roomDevices.length && clearSelectedDevices();
		const updatedRoomId = event.target.value;
		setProjectRoomId(updatedRoomId);
	};

	const handleSelectedDevices = (event) => {
		console.log(event);
		const { value } = event.target;
		const updatedRoomDevices =
			typeof value === "string" ? value.split(",") : value; // On autofill we get a stringified value.
		setRoomDevices(updatedRoomDevices);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!projectId) return console.log("Seleccione un Proyecto");
		if (!projectRoomId.length)
			return console.log("Seleccione un área para el proyecto elegido");
		if (!roomDevices.length)
			return console.log(
				"Debe elegir al menos un dispositivo para el área seleccionada"
			);
		const apoloPayload = {
			projectId: Number.parseInt(projectId),
			projectRoomId: Number.parseInt(projectRoomId),
			listOfRoomDeviceId: roomDevices.map((device) =>
				Number.parseInt(device)
			)
		};
		console.log(apoloPayload);
	};

	console.log(
		`{
		"listOfRoomDeviceId": ${roomDevices
			.map((item) => Number.parseInt(item.split(":")[0]))
			.join(", ")}
			}`
	);

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
					<InputLabel id="projectRoomSelectLabel">Áreas</InputLabel>
					<Select
						labelId="projectRoomSelectLabel"
						id="projectRoomSelect"
						value={projectRoomId}
						label="Áreas"
						onChange={handleSelectedRoom}
					>
						{loadingRooms ? (
							<MenuItem>Loading...</MenuItem>
						) : (
							rooms.map((room) => (
								<MenuItem key={room.id} value={room.id}>
									{room.name}
								</MenuItem>
							))
						)}
					</Select>
				</FormControl>
				<FormControl sx={{ m: 3, width: 300 }} size="small">
					<InputLabel id="roomDevicesSelectLabel">
						Dispositivos
					</InputLabel>
					<Select
						labelId="roomDevicesSelectLabel"
						id="projectAreasSelect"
						multiple
						value={roomDevices}
						onChange={handleSelectedDevices}
						input={<OutlinedInput label="Dispositivos" />}
						renderValue={(selected) => {
							console.log("selected:", selected);
							const selectedMap = selected
								.map((item) => item.split(":")[1])
								.join(", ");
							console.log("selectedMap:", selectedMap);
							return selectedMap;
						}}
						MenuProps={MenuProps}
					>
						{loadingDevices ? (
							<MenuItem>Loading...</MenuItem>
						) : (
							devices.map(({ id, name }) => {
								const stringifiedDevice = `${id}:${name}`;
								return (
									<MenuItem
										key={id}
										value={stringifiedDevice}
									>
										<Checkbox
											checked={roomDevices.includes(
												stringifiedDevice
											)}
										/>
										<ListItemText primary={name} />
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
