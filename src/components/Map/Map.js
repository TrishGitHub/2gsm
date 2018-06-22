import React, { Component, Fragment } from 'react';
import DG from '2gis-maps';
import axios from 'axios';

import './Map.css';

let map,
	markerToMove,
	markers = DG.featureGroup(),
	markersApi = [],
	myLng,
	myLat;


class Map extends Component {

	markersSaveHandler = () => {
		markersApi.forEach(function (element) {
			axios.post('http://localhost:3001/api/markers', {
				latitude: element[0],
				longitude: element[1]
			})
				.then(response => {
					console.log(response)
				})
				.catch(error => {
					console.log(error.response)
				});
		});
	};

	showClosestHandler = () => {
		DG.then(function() {
			axios.get(`http://localhost:3001/api/pharmacies?lng=${myLng}&lat=${myLat}`)
				.then(res => {
					let pharmacyApi = res.data,
						newLat = pharmacyApi.pharmacies[0].geometry.coordinates[0],
						newLng = pharmacyApi.pharmacies[0].geometry.coordinates[1];

					markerToMove.setLatLng([newLat, newLng]);
				})
		});

	};

	render() {
		DG.then(function () {
			map = DG.map('map', {
				//center: [46.484583, 30.7326],
				zoom: 13,
				trackResize: true
			});
			map.locate({setView: true, watch: true})
				.on('locationfound', function(e) {
					markerToMove = DG.marker([e.latitude, e.longitude]).addTo(map);

					myLng = e.latitude;
					myLat = e.longitude;

				})
				.on('locationerror', function(e) {
					DG.popup()
						.setLatLng(map.getCenter())
						.setContent('Доступ к определению местоположения отключён')
						.openOn(map);
				});
			map.on('click', function(e) {
				DG.marker([e.latlng.lat, e.latlng.lng])
					.addTo(map)
					.addTo(markers);

				markers.addTo(map);

				markersApi.push( [e.latlng.lat, e.latlng.lng] );

				let isExecuted = (function() {
					let executed = true;
					return function() {
						if (executed) {
							hideBtn.classList.remove("btn__disabled");
							executed = false;
						}
					};
				})();

				isExecuted();
			});

			const hideBtn = document.getElementById('hide'),
				  showBtn = document.getElementById('show');

			hideBtn.onclick = hideMarkers;
			showBtn.onclick = showMarkers;

			function toggleBtn() {
				hideBtn.classList.toggle("btn__disabled");
				showBtn.classList.toggle("btn__disabled");
			}

			function showMarkers() {
				markers.addTo(map);
				toggleBtn();
			};

			function hideMarkers() {
				markers.removeFrom(map);
				toggleBtn();
			};
		});

		return (
			<Fragment>
				<ul className="list"> Show closest:
					<li className="list-item"
					    onClick={ this.showClosestHandler } >pharmacy</li>
					{/*<li className="list-item">gas station</li>*/}
					{/*<li className="list-item">school</li>*/}
					{/*<li className="list-item">restaurant</li>*/}
				</ul>
				<div className="bnt-group">
					<input id="save" className="btn" type="button" value="save markers"
					       onClick = { this.markersSaveHandler }
					/>

					<input id="show"
					       className= "btn btn__disabled"
					       type="button"
					       value="show markers"
					/>

					<input id="hide"
					       className="btn btn__disabled"
					       type="button"
					       value="hide markers"
					/>
				</div>
				<div id="map"
				     style={{ width: "100%", height: "600px" }}
				/>
			</Fragment>
		);
	}
}

export default Map;