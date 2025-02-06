const presence = new Presence({
	clientId: "1264754447276310599",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
Logo = "https://i.imgur.com/XAPT5YG.png",
}

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
		type: ActivityType.Watching,
	},
	{ href, pathname, search } = document.location;
switch (true) {
	case pathname === "/":
	case pathname === "/home":
		presenceData.details = "Viewing Homepage";
		break;
	case pathname === "/search":
		presenceData.details = `Viewing results: ${search
			.split("=")[1]
			.replace(/\+/g, " ")}`;
		presenceData.smallImageKey = Assets.Search;
		break;
	case pathname.includes("/watch/"): {
		presenceData.details = document.title
			.replace(/^Watch /, "")
			.replace(/ English Sub\/Dub online Free on HiAnime.to$/, "");

		const episodeNumber = document.querySelector('[class="ssl-item ep-item active').getAttribute("data-number");
		const episodeName = document.querySelector('[class="ssl-item ep-item active"]').getAttribute("title");
		const coverArt = document.querySelector('[class="film-poster-img"]').getAttribute("src");
		presenceData.largeImageKey = coverArt;
		presenceData.state = `Episode ${episodeNumber}: ${episodeName}`;
		presenceData.buttons = [
			{
				label: "View Anime",
				url: href,
			},
		];
		break;
	}
	case pathname.includes("/az-list"):
		presenceData.details = `Viewing AZ List: ${pathname.split("/")[2]}`;
		presenceData.smallImageKey = Assets.Search;
		break;
	case pathname === "/movie":
		presenceData.details = "Browsing movies...";
		presenceData.smallImageKey = Assets.Search;
		break;
	case pathname === "/tv":
		presenceData.details = "Browsing TV series...";
		presenceData.smallImageKey = Assets.Search;
		break;
	case pathname.includes("/watch2gether"):
		presenceData.details = "Watching an anime with a friend";
		presenceData.smallImageKey = Assets.Search;
		break;
	case pathname.includes("/community"):
		presenceData.details = "Browsing Community posts...";
		presenceData.smallImageKey = Assets.Search;
		break;
	case pathname === "/most-popular":
		presenceData.details = "Browsing popular animes...";
		presenceData.smallImageKey = Assets.Search;
		break;
	case pathname === "/top-airing":
		presenceData.details = "Browsing top airing animes...";
		presenceData.smallImageKey = Assets.Search;
		break;
	default:
		presenceData.details = "Browsing HiAnime...";
		break;
}
presence.setActivity(presenceData);
});