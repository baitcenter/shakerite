import { Capacitor } from '@capacitor/core';
import { Nav } from '@ionic/core/dist/types/components/nav/nav';

export function env(constant: string) {
	return process.env[constant];
}

export enum Platform {
	iOS = 'ios',
	Android = 'android',
	Web = 'web',
}

export function getActiveComponent(app) {
	const tab = document.querySelector('body ion-tab:not(.tab-hidden)');
	return app.$children.find(child => tab?.contains(child.$el));
}

export function getNav(): Nav & HTMLElement {
	return (document.querySelector('body ion-tab:not(.tab-hidden) > ion-nav') as unknown) as Nav &
		HTMLElement;
}

export const iOSAppID = env('VUE_APP_IOS_APP_ID');
export const { platform } = Capacitor;
export let deviceReady = false;
document.addEventListener(
	'deviceready',
	() => {
		deviceReady = true;
	},
	false
);

export const injectParent = {
	beforeCreateVueInstance(RootComponentDefinition) {
		RootComponentDefinition.parent = window.vue;
		RootComponentDefinition.store = window.vue.$store;
		return RootComponentDefinition;
	},
};
export function setImmediate() {
	return new Promise(resolve => {
		window.setTimeout(resolve, 0);
	});
}
