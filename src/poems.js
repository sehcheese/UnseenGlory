import aPrayer from './poems/aPrayer';
import azaleaBlooming from './poems/azaleaBlooming';
import cirrus from './poems/cirrus';
import coramDeo from './poems/coramDeo';
import forgottenFlowers from './poems/forgottenFlowers';
import freeAtLast from './poems/freeAtLast';
import gloriousThingsEscapeUs from './poems/gloriousThingsEscapeUs';
import listen from './poems/listen';
import lordOfTheBalance from './poems/lordOfTheBalance';
import meditationOnJohn14_6 from './poems/meditationOnJohn14_6';
import myBirdsTheySingForGlory from './poems/myBirdsTheySingForGlory';
import noon from './poems/noon';
import peaceMySoul from './poems/peaceMySoul';
import seasons from './poems/seasons';
import someMoments from './poems/someMoments';
import theLastSongOfTheTuckerbird from './poems/theLastSongOfTheTuckerbird';
import theLightBeforeTheDawn from './poems/theLightBeforeTheDawn';
import thisChasmOfUnknowing from './poems/thisChasmOfUnknowing';
import thisPathIveTread from './poems/thisPathIveTread';
import toAFriend from './poems/toAFriend';
import twelveEleven from './poems/twelveEleven';
import waking from './poems/waking';
import winterSun from './poems/winterSun';

export const poems = {
	'a-prayer': aPrayer,
	'azalea-blooming': azaleaBlooming,
	'cirrus': cirrus,
	'coram-deo': coramDeo,
	'forgotten-flowers': forgottenFlowers,
	'free-at-last': freeAtLast,
	'glorious-things-escape-us': gloriousThingsEscapeUs,
	'listen': listen,
	'lord-of-the-balance': lordOfTheBalance,
	'meditation-on-john-14-6': meditationOnJohn14_6,
	'my-birds-they-sing-for-glory': myBirdsTheySingForGlory,
	'noon': noon,
	'peace-my-soul': peaceMySoul,
	'seasons': seasons,
	'some-moments': someMoments,
	'the-last-song-of-the-tuckerbird': theLastSongOfTheTuckerbird,
	'the-light-before-the-dawn': theLightBeforeTheDawn,
	'this-chasm-of-unknowing': thisChasmOfUnknowing,
	'this-path-ive-tread': thisPathIveTread,
	'to-a-friend': toAFriend,
	'twelve-eleven': twelveEleven,
	'waking': waking,
	'winter-sun': winterSun,
};

export const poemOrder = Object.keys(poems).sort();
