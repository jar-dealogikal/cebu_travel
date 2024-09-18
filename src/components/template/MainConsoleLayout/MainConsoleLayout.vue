<script setup>
import { ref } from "vue";
import { Dialog, DialogPanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import moalboalImage from "@/assets/moalboal.jpg";

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "About Us", href: "#" },
	{ name: "Destinations", href: "#" },
	{ name: "FAQs", href: "#" },
];

const mobileMenuOpen = ref(false);
</script>

<template>
	<div class="bg-gray-100">
		<header class="absolute inset-x-0 top-0 z-50 animate-slide-down">
			<nav
				class="flex items-center justify-between p-6 lg:px-8 bg-black bg-opacity-40"
				aria-label="Global"
			>
				<div class="flex lg:flex-1">
					<a href="#" class="-m-1.5 p-1.5">
						<span class="sr-only">Your Company</span>
						<img
							class="h-8 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
							alt=""
						/>
					</a>
				</div>
				<div class="flex lg:hidden">
					<button
						type="button"
						class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
						@click="mobileMenuOpen = true"
					>
						<span class="sr-only">Open main menu</span>
						<Bars3Icon class="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div class="hidden lg:flex lg:gap-x-12">
					<a
						v-for="item in navigation"
						:key="item.name"
						:href="item.href"
						class="text-base font-semibold leading-6 text-white hover:text-cyan-700"
						>{{ item.name }}</a
					>
				</div>
				<div class="hidden lg:flex lg:flex-1 lg:justify-end">
					<a href="#" class="text-sm font-semibold leading-6 text-white"
						>Book Now <span aria-hidden="true">&rarr;</span></a
					>
				</div>
			</nav>
			<Dialog
				class="lg:hidden"
				@close="mobileMenuOpen = false"
				:open="mobileMenuOpen"
			>
				<div class="fixed inset-0 z-50" />
				<DialogPanel
					class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10"
				>
					<div class="flex items-center justify-between">
						<a href="#" class="-m-1.5 p-1.5">
							<span class="sr-only">Your Company</span>
							<img
								class="h-8 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
								alt=""
							/>
						</a>
						<button
							type="button"
							class="-m-2.5 rounded-md p-2.5 text-gray-400"
							@click="mobileMenuOpen = false"
						>
							<span class="sr-only">Close menu</span>
							<XMarkIcon class="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div class="mt-6 flow-root">
						<div class="-my-6 divide-y divide-gray-500/25">
							<div class="space-y-2 py-6">
								<a
									v-for="item in navigation"
									:key="item.name"
									:href="item.href"
									class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
									>{{ item.name }}</a
								>
							</div>
							<div class="py-6">
								<a
									href="#"
									class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
									>Book Now</a
								>
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>

		<div class="relative isolate overflow-hidden pt-14">
			<img
				:src="moalboalImage"
				alt="Moalboal"
				class="absolute inset-0 -z-10 h-[50rem] w-full object-cover"
			/>
			<slot></slot>
		</div>
	</div>
</template>

<style scoped>
@keyframes slide-down {
	from {
		transform: translateY(-100%);
	}
	to {
		transform: translateY(0);
	}
}

.animate-slide-down {
	animation: slide-down 1s ease-out;
}
</style>
