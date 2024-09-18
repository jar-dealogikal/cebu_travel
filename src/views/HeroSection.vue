<script setup>
import { ref, onMounted } from "vue";
import MainConsoleLayout from "@/components/template/MainConsoleLayout/MainConsoleLayout.vue";
import textCebu from "@/assets/Intersect.png";

const getCurrentDate = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const options = [
	{
		name: "1 Person",
	},
	{
		name: "2 Person",
	},
	{
		name: "3 Person",
	},
	{
		name: "4 Person",
	},
];

const cebuDestinations = [
	"Kawasan Falls",
	"Oslob Whale Shark Watching",
	"Magellan's Cross",
	"Basilica del Santo Niño",
	"Tops Lookout",
	"Bantayan Island",
	"Moalboal",
	"Sumilon Island",
	"Osmena Peak",
	"Camotes Islands",
];

const features = [
	{
		id: 1,
		name: "Tops of Cebu",
		description:
			"Tops offers stunning panoramic views of Cebu City, Mactan Island, and the surrounding areas. It's especially popular during sunset and at night, when the city lights create a beautiful, twinkling landscape.",
		imageSrc:
			"https://res.cloudinary.com/dqig7qaz7/image/upload/v1725935878/my_portfolio/images/topsofcebu_g3if08.jpg",
		imageAlt: "tops of cebu",
	},
	{
		id: 2,
		name: "Osmeña Peak",
		description:
			"As the highest point on the island, Osmeña Peak offers breathtaking views of jagged, rolling hills, limestone cliffs, and the surrounding areas, including a view of the coastlines of both eastern and western Cebu.",
		imageSrc:
			"https://res.cloudinary.com/dqig7qaz7/image/upload/v1725936205/my_portfolio/images/osmea_z1atry.jpg",
		imageAlt: "Osmeña Peak",
	},
	{
		id: 3,
		name: "Moalboal Sardine's Run",
		description:
			'The Sardines Run is a year-round event where vast schools of sardines swim near the shore of Panagsama Beach in Moalboal. The fish form large, moving "walls" or "tornadoes," creating a stunning visual spectacle.',
		imageSrc:
			"https://res.cloudinary.com/dqig7qaz7/image/upload/v1725936124/my_portfolio/images/sardinerun_cuhzyq.jpg",
		imageAlt: "Moalboal Sardine's Run",
	},
];

const destinationInput = ref("");
const filteredDestinations = ref([]);
const selectedDate = ref(getCurrentDate());
const selectedGuests = ref("1 Person");

const filterDestinations = () => {
	if (destinationInput.value) {
		filteredDestinations.value = cebuDestinations.filter((dest) =>
			dest.toLowerCase().includes(destinationInput.value.toLowerCase())
		);
	} else {
		filteredDestinations.value = [];
	}
};

const selectDestination = (destination) => {
	console.log("selected destination", destination);
	destinationInput.value = destination;
	filteredDestinations.value = [];
};

const bookNowHandler = () => {
	const bookingDetails = {
		destination: destinationInput.value,
		date: selectedDate.value,
		guests: selectedGuests.value,
	};
	console.log("Booking details:", bookingDetails);
	alert(
		`Booking details:\nDestination: ${bookingDetails.destination}\nDate: ${bookingDetails.date}\nGuests: ${bookingDetails.guests}`
	);
};

const readMoreHandler = (id) => {
	alert(`You clicked Read More for feature with ID: ${id}`);
};

onMounted(() => {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('animate-fade-in-up');
			} else {
				entry.target.classList.remove('animate-fade-in-up');
			}
		});
	}, { threshold: 0.1 });

	document.querySelectorAll('.animate-on-scroll').forEach((el) => {
		observer.observe(el);
	});

	const featureObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const featureIdx = parseInt(entry.target.dataset.featureIdx);
				entry.target.classList.add(featureIdx % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right');
			} else {
				entry.target.classList.remove('animate-fade-in-left', 'animate-fade-in-right');
			}
		});
	}, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });

	document.querySelectorAll('.feature-item').forEach((el) => {
		featureObserver.observe(el);
	});
});
</script>

<template>
	<MainConsoleLayout>
		<div class="min-h-screen flex justify-center items-center mt-10 animate-on-scroll">
			<div class="container mx-auto px-4 py-8">
				<header class="mb-8">
					<h1 class="text-4xl font-bold text-white">CebuTour</h1>
					<p class="text-xl text-white opacity-80">
						Your Gateway to Cebu Adventure
					</p>
				</header>

				<div
					class="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 shadow-lg"
				>
					<div class="flex space-x-4 mb-6">
						<button
							class="flex items-center space-x-2 text-white bg-white bg-opacity-20 px-4 py-2 rounded-full transition"
						>
							<span>🏖️</span>
							<span>Destinations</span>
						</button>
						<button
							class="flex items-center space-x-2 text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-full transition"
						>
							<span>✈️</span>
							<span>Flights</span>
						</button>
						<button
							class="flex items-center space-x-2 text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-full transition"
						>
							<span>🏨</span>
							<span>Hotels</span>
						</button>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div class="relative">
							<label class="text-white text-sm mb-1 block">Location</label>
							<input
								type="text"
								placeholder="Enter Cebu destination"
								v-model="destinationInput"
								@input="filterDestinations"
								class="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
							/>
							<ul
								v-if="filteredDestinations.length > 0"
								class="absolute z-10 w-full mt-1 bg-white bg-opacity-90 rounded-lg shadow-lg"
							>
								<li
									v-for="destination in filteredDestinations"
									:key="destination"
									@click="selectDestination(destination)"
									class="px-4 py-2 cursor-pointer hover:bg-gray-200"
								>
									{{ destination }}
								</li>
							</ul>
						</div>
						<div class="relative">
							<label class="text-white text-sm mb-1 block">Date</label>
							<input
								type="date"
								:min="getCurrentDate()"
								:value="getCurrentDate()"
								v-model="selectedDate"
								class="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-white"
							/>
						</div>
						<div class="relative">
							<label class="text-white text-sm mb-1 block">Guests</label>
							<select
								v-model="selectedGuests"
								class="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-white"
							>
								<option
									v-for="item in options"
									:key="item.name"
									:value="item.name"
								>
									{{ item.name }}
								</option>
							</select>
						</div>
					</div>

					<button
						class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
						@click="bookNowHandler"
					>
						Book Now
					</button>
				</div>
			</div>
		</div>
		<section id="about" class="text-center flex flex-col py-5 mt-32 md:mt-16 animate-on-scroll">
			<p
				class="mb-4 inline-block py-1 px-3 rounded-full text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
			>
				CebuTour Co.
			</p>
			<h1
				class="mt-4 text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 max-w-4xl mx-auto"
			>
				Discover Your Wanderlust:
				<span class="block mt-2">Unveil Extraordinary</span>
				<span class="block mt-2 text-gray-500">Adventures in Cebu!</span>
			</h1>
			<div class="relative mt-20">
				<img :src="textCebu" alt="img" class="w-full h-full" />
				<div
					class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-50 via-gray-400 to-transparent opacity-40"
				></div>
			</div>
			<div class="flex justify-center items-center mx-10 mt-12 content-center">
				<div
					class="flex flex-col justify-center items-center gap-5 md:flex-row md:items-none"
				>
					<h2 class="">CebuTour</h2>
					<p class="text-gray-500">
						Welcome to CebuTour, where passion for travel meets unparalled
						expertise. Founded on the belief that every journey should be an
						unforgettable adventure, we are dedicated to creating bespoke travel
						experience tailored to your desires.
					</p>
					<button
						class="w-full md:w-1/4 bg-blue-400 text-sm text-white py-2 rounded-md"
					>
						Learn More
					</button>
				</div>
			</div>
		</section>

		<section id="cebu_top_list"
			class="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8"
		>
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Top Popular Cebu Tourist Spot
				</h2>
			</div>

			<div class="mt-16 space-y-16">
				<div
					v-for="(feature, featureIdx) in features"
					:key="feature.name"
					:data-feature-idx="featureIdx"
					class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8 feature-item"
				>
					<div
						:class="[
							featureIdx % 2 === 0
								? 'lg:col-start-1'
								: 'lg:col-start-8 xl:col-start-9',
							'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4',
						]"
					>
						<h3 class="text-3xl font-medium text-gray-900">
							{{ feature.name }}
						</h3>
						<p class="mt-2 text-sm text-gray-500">{{ feature.description }}</p>
						<button
							@click="readMoreHandler(feature.id)"
							class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-sans py-2 px-8 rounded text-sm"
						>
							Read More
						</button>
					</div>
					<div
						:class="[
							featureIdx % 2 === 0
								? 'lg:col-start-6 xl:col-start-5'
								: 'lg:col-start-1',
							'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8',
						]"
					>
						<div
							class="aspect-h-2 aspect-w-5 overflow-hidden rounded-lg bg-gray-100"
						>
							<img
								:src="feature.imageSrc"
								:alt="feature.imageAlt"
								class="object-cover object-center"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	</MainConsoleLayout>
</template>

<style>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.animate-fade-in-left {
  animation: fadeInLeft 2s ease-out;
}

.animate-fade-in-right {
  animation: fadeInRight 2s ease-out;
}
</style>
