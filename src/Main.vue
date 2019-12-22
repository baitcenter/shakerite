<template>
	<ion-tabs>
		<ion-tab tab="news">
			<news />
		</ion-tab>

		<ion-tab tab="saved">
			<saved />
		</ion-tab>

		<ion-tab tab="settings">
			<settings />
		</ion-tab>

		<ion-tab-bar slot="bottom" ref="tabBar">
			<ion-tab-button tab="news" @click="click('news')">
				<ion-icon name="paper" />
				<ion-label>News</ion-label>
			</ion-tab-button>

			<ion-tab-button tab="saved" @click="click('saved')">
				<ion-icon :src="bookmarkURL" class="bookmark-icon" />
				<ion-label>Saved</ion-label>
			</ion-tab-button>

			<ion-tab-button tab="settings" @click="click('settings')">
				<ion-icon name="settings" />
				<ion-label>Settings</ion-label>
			</ion-tab-button>
		</ion-tab-bar>
	</ion-tabs>
</template>

<script lang="ts">
import {
	Component, Ref, Vue, Watch,
} from 'vue-property-decorator';
import Settings from './views/Settings.vue';
import Saved from './views/Saved.vue';
import News from './views/News.vue';
import { getActiveComponent } from './helpers';

@Component({
	components: { Settings, Saved, News },
})
export default class SettingsHome extends Vue {
	bookmarkURL = require('@fortawesome/fontawesome-free/svgs/solid/bookmark.svg');
	activeTab = 'news';
	isSystemDark = false;

	@Ref() readonly tabBar!: HTMLElement;

	get isDarkTheme() {
		if (this.$store.state.theme === 'default') return this.isSystemDark;
		return this.$store.state.theme === 'dark';
	}

	@Watch('isDarkTheme', { immediate: true })
	changeTheme(data: boolean) {
		if (data) document.body.classList.add('dark');
		else document.body.classList.remove('dark');
	}

	mounted() {
		window.addEventListener('keyboardWillShow', (event) => {
			if (event.keyboardHeight) this.tabBar.classList.add('hidden');
		});
		window.addEventListener('keyboardWillHide', () => {
			this.tabBar.classList.remove('hidden');
			if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
		});

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)') as any;
		this.isSystemDark = mediaQuery.matches;
		mediaQuery.addListener(({ matches }: { matches: boolean }) => {
			this.isSystemDark = matches;
		});
	}

	click(e) {
		if (this.activeTab === e) {
			const component = getActiveComponent(this);
			component.$router.history.go(-component.$router.history.index);
		}
		this.activeTab = e;
	}
}
</script>

<style scoped>

</style>