import { AnimationTypeEnum, Clip, Effect, Engine } from "@rendley/sdk";
import { BACKGROUND_GRADIENT_SHADER } from "./shaders/BackgroundGradientShader";
import { LUMA_KEY_SHADER } from "./shaders/LumaKeyShader";
import {
  COUNTING_INTRO_TEXTS_ANIMATION,
  DOWNSCALE_INTRO_TEXT_ANIMATION,
  FADE_OUT_ANIMATION,
  getCountUpAnimation,
  getScrollingTextsAnimation,
  HAND_ANIMATION,
  ICON_POPUP_ANIMATION,
  PRODUCTIVE_DAY_ANIMATION,
  ROTATE_PROFILE_PICTURE_ANIMATION,
  ROTATE_STAR_ANIMATION,
} from "./animations";
import { stretchSize } from "./utils";

enum MediaAssetsEnum {
  BACKGROUND_AUDIO = "background_audio",
  PROFILE = "profile",
  TADA = "tada",
  CALENDAR = "calendar",
  STAR = "star",
  ROCKET = "rocket",
  WRENCH = "wrench",
  HAD_FUN_GIF = "had_fun_gif",
  CONTRIBUTIONS_GIF = "contributions_gif",
  GOOD_ACTIVITY_GIF = "good_activity_gif",
  PRODUCTIVE_STRANGE_HOUR = "productive_strange_hour_gif",
  STARS_GIF = "stars_gif",
  INTERESTING_CHOICE_GIF = "interesting_choice_gif",
  BYE_GIF = "bye_gif",
  CONFETTI_VIDEO = "confetti_video",
  MASK_SCROLL = "mask_scroll",
  HAND = "hand",
}

export interface SceneData {
  username: string;
  avatarUrl: string;
  contributionsCount: number;
  commitsCount: number;
  pullRequestsCount: number;
  openedIssuesCount: number;
  mostProductiveDay: string;
  mostProductiveHour: string;
  repositoriesCreatedCount: 14;
  starsReceivedCount: number;
  mostUsedLanguages: string[];
  starredRepositories: string[];
}

type MediaAssetsData = Record<MediaAssetsEnum, string>;

export class SceneManager {
  private data: SceneData = {} as SceneData;
  private mediaAssets: MediaAssetsData = {} as MediaAssetsData;

  async init(view: HTMLCanvasElement) {
    const engine = Engine.getInstance();

    if (engine.isInitialized()) {
      return;
    }

    await Promise.all([
      engine.getFontRegistry().loadFromCssUrl("Inter", "/fonts/Inter.css"),
      engine.init({
        display: {
          width: 1080,
          height: 1080,
          backgroundColor: "#ad67c1",
          view,
        },
        license: {
          licenseName: import.meta.env.VITE_LICENSE_NAME,
          licenseKey: import.meta.env.VITE_LICENSE_KEY,
        },
      }),
    ]);
  }

  async load(data: SceneData) {
    this.data = data;

    await this.reset();

    const engine = Engine.getInstance();

    for (let i = 0; i < 6; i++) {
      engine.getTimeline().createLayer();
    }

    const howMuchFun = this.getRandomAsset({
      choice: "default",
      choices: {
        default: [
          "/gifs/HowMuchFun/200.gif",
          "/gifs/HowMuchFun/H15RoGS.gif",
          "/gifs/HowMuchFun/fun.gif",
          "/gifs/HowMuchFun/had_fun.gif",
          "/gifs/HowMuchFun/icegif-1661.gif",
          "/gifs/HowMuchFun/oh-yes-yeah.gif",
          "/gifs/HowMuchFun/party-icegif-1.gif",
          "/gifs/HowMuchFun/x7OLP4.gif",
        ],
      },
    });

    const contributions = this.getRandomAsset({
      choice: data.contributionsCount > 0 ? "more" : "none",
      choices: {
        none: ["/gifs/Contributions/0/icegif-1064.gif"],
        more: [
          "/gifs/Contributions/200w.gif",
          "/gifs/Contributions/contributions.gif",
          "/gifs/Contributions/pout-christian-bale.gif",
          "/gifs/Contributions/thumbs-up-computer.gif",
          "/gifs/Contributions/tumblr_c794d5a81bf84401ccecb3fb38d55b31_4f86fe78_400.gif",
        ],
      },
    });

    const activity = this.getRandomAsset({
      choice: "default",
      choices: {
        default: [
          "/gifs/NotBad/f050405657f9ac48d3b976051436e885.gif",
          "/gifs/NotBad/good_activity.gif",
          "/gifs/NotBad/not-bad-498-x-498-gif-wbe14tmxkyvfdnip.gif",
          "/gifs/NotBad/not-bad-whatever-you-say.gif",
          "/gifs/NotBad/really-oh-seriously.gif",
        ],
      },
    });

    const productiveHour = parseInt(data.mostProductiveHour, 10);
    const isAM = data.mostProductiveHour.includes("AM");
    const isStrange =
      (productiveHour >= 0 && productiveHour < 6 && isAM) ||
      (productiveHour >= 8 && productiveHour < 12 && !isAM) ||
      (productiveHour === 12 && isAM);

    const mostProductiveHour = this.getRandomAsset({
      choice: isStrange ? "strange" : "good",
      choices: {
        good: [
          "/gifs/WhatTime/good/1_kLQyKjBC8l6C33_1WjGoAw.gif",
          "/gifs/WhatTime/good/the-office-the.gif",
        ],
        strange: [
          "/gifs/WhatTime/strange/855a9e399998212d2e633310e475397e.gif",
          "/gifs/WhatTime/strange/productive_strange_hour.gif",
          "/gifs/WhatTime/strange/sxv-wtf.gif",
          "/gifs/WhatTime/strange/tom-delonge-blink182.gif",
          "/gifs/WhatTime/strange/wtf.gif",
        ],
      },
    });

    const stars = this.getRandomAsset({
      choice: data.starsReceivedCount > 0 ? "more" : "none",
      choices: {
        none: [
          "/gifs/Stars/0/044.gif",
          "/gifs/Stars/0/c797bc872b4f7ef79700a7810c783d16.gif",
          "/gifs/Stars/0/confused-ryan-reynolds-jnjntvqwoiksh55h.gif",
          "/gifs/Stars/0/eb18e6e9af22b621707a0a8a922a48b2_w200.gif",
          "/gifs/Stars/0/giphy.gif",
          "/gifs/Stars/0/john-cena-huh.gif",
          "/gifs/Stars/0/vincent.gif",
        ],
        more: [
          "/gifs/Stars/200w.gif",
          "/gifs/Stars/stars.gif",
          "/gifs/Stars/wow-surprise.gif",
        ],
      },
    });

    const interestingChoice = this.getRandomAsset({
      choice: "default",
      choices: {
        default: [
          "/gifs/Interesting Choice/200w.gif",
          "/gifs/Interesting Choice/giphy (1).gif",
          "/gifs/Interesting Choice/giphy (2).gif",
          "/gifs/Interesting Choice/giphy.gif",
          "/gifs/Interesting Choice/icegif-1.gif",
        ],
      },
    });

    const bye = this.getRandomAsset({
      choice: "default",
      choices: {
        default: [
          "/gifs/Leaving/200w (1).gif",
          "/gifs/Leaving/200w.gif",
          "/gifs/Leaving/bye.gif",
          "/gifs/Leaving/giphy (1).gif",
          "/gifs/Leaving/homerfade.gif",
          "/gifs/Leaving/tumblr_f55f990aa01186f9040f77c59f1d647a_a66507c2_500.gif",
        ],
      },
    });

    await Promise.all([
      this.loadMediaAsset(this.data.avatarUrl, MediaAssetsEnum.PROFILE),
      this.loadMediaAsset("/images/tada.png", MediaAssetsEnum.TADA),
      this.loadMediaAsset("/images/calendar.png", MediaAssetsEnum.CALENDAR),
      this.loadMediaAsset("/images/star.png", MediaAssetsEnum.STAR),
      this.loadMediaAsset("/images/rocket.png", MediaAssetsEnum.ROCKET),
      this.loadMediaAsset("/images/wrench.png", MediaAssetsEnum.WRENCH),
      this.loadMediaAsset("/images/mask.png", MediaAssetsEnum.MASK_SCROLL),
      this.loadMediaAsset(howMuchFun, MediaAssetsEnum.HAD_FUN_GIF),
      this.loadMediaAsset(contributions, MediaAssetsEnum.CONTRIBUTIONS_GIF),
      this.loadMediaAsset(activity, MediaAssetsEnum.GOOD_ACTIVITY_GIF),
      this.loadMediaAsset(
        mostProductiveHour,
        MediaAssetsEnum.PRODUCTIVE_STRANGE_HOUR
      ),
      this.loadMediaAsset(stars, MediaAssetsEnum.STARS_GIF),
      this.loadMediaAsset(
        interestingChoice,
        MediaAssetsEnum.INTERESTING_CHOICE_GIF
      ),
      this.loadMediaAsset(bye, MediaAssetsEnum.BYE_GIF),
      this.loadMediaAsset("/images/hand.png", MediaAssetsEnum.HAND),
      this.loadMediaAsset(
        "/videos/confetti.mp4",
        MediaAssetsEnum.CONFETTI_VIDEO
      ),
      this.loadMediaAsset(
        "/audio/background.mp3",
        MediaAssetsEnum.BACKGROUND_AUDIO
      ),
    ]);

    await Promise.all([
      this.createAudioScene(),
      this.createScene1(),
      this.createScene2(),
      this.createScene3(),
      this.createScene4(),
      this.createScene5(),
      this.createScene6(),
      this.createScene7(),
      this.createScene8(),
      this.createScene9(),
      this.createScene10(),
      this.createScene11(),
      this.createScene12(),
      this.createScene13(),
      this.createScene14(),
      this.createScene15(),
      this.createScene16(),
      this.createScene17(),
      this.createScene18(),
      this.createScene19(),
      this.createScene20(),
      this.createScene21(),
    ]);

    await this.createBackgroundScene();

    Engine.getInstance().getTimeline().adjustClipsLayout();
  }

  async destroy() {
    await Engine.getInstance().destroy();
  }

  async reset() {
    const timeline = Engine.getInstance().getTimeline();

    for (const layerId in timeline.layers) {
      timeline.removeLayer(layerId);
    }
  }

  private getRandomAsset(payload: {
    choice: string;
    choices: Record<string, string[]>;
  }) {
    const assets = payload.choices[payload.choice];
    return assets[Math.floor(Math.random() * assets.length)];
  }

  private async loadMediaAsset(url: string, id: MediaAssetsEnum) {
    const library = Engine.getInstance().getLibrary();
    const mediaId = await library.addMedia(url);

    if (mediaId == null) {
      throw new Error("Cannot load media");
    }

    const mediaData = library.getMediaById(mediaId)!;
    mediaData.setPermanentUrl(url);

    this.mediaAssets[id] = mediaId;
  }

  getLayerByIndex(index: number) {
    const layerId = Engine.getInstance().getTimeline().layersOrder[index];
    return Engine.getInstance().getTimeline().getLayerById(layerId)!;
  }

  scaleClipToFitDisplay(clip: Clip) {
    const displayWidth = Engine.getInstance().getDisplay().getWidth();
    const displayHeight = Engine.getInstance().getDisplay().getHeight();

    const scale = stretchSize(
      clip.style.getRawWidth(),
      clip.style.getRawHeight(),
      displayWidth,
      displayHeight
    );

    clip.style.setScale(scale[0], scale[1]);
  }

  async createAudioScene() {
    const layer5 = this.getLayerByIndex(5);

    await layer5.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.BACKGROUND_AUDIO],
        startTime: 0,
      },
      { adjustLayout: false }
    );
  }

  async createBackgroundScene() {
    const layer0 = this.getLayerByIndex(0);
    const duration = Engine.getInstance().getTimeline().getFitDuration();

    const clip = await layer0.addClip(
      {
        type: "shape",
        shape: "rectangle",
        startTime: 0,
        duration: duration - 1 / 30,
        style: {
          width: 1080,
          height: 1080,
        },
      },
      { adjustLayout: false }
    );

    if (!clip) {
      throw new Error("Cannot create background");
    }

    await clip.addEffect(
      new Effect({
        sourceId: "backgroundGradient",
        fragmentSrc: BACKGROUND_GRADIENT_SHADER,
        textureWidth: clip.style.getRawWidth(),
        textureHeight: clip.style.getRawHeight(),
        frameWidth: clip.style.getRawWidth(),
        frameHeight: clip.style.getRawHeight(),
        uniforms: {},
      })
    );
  }

  private getCenterX() {
    return 1080 / 2;
  }

  private getCenterY() {
    return 1080 / 2;
  }

  async createScene1() {
    const layer1 = this.getLayerByIndex(1);

    const clip = await layer1.addClip({
      text: `GitHub Wrapped is here`,
      startTime: 0,
      duration: 1.25,
      style: {
        fontSize: 100,
        fontFamily: "Inter",
        color: "#FFFFFF",
        fontWeight: "600",
        textAlign: "center",
        wordWrapWidth: 800,
      },
    });

    clip?.animationController.setAnimation(
      AnimationTypeEnum.IN,
      DOWNSCALE_INTRO_TEXT_ANIMATION
    );

    clip?.animationController.setAnimationDuration(AnimationTypeEnum.IN, 0.3);
  }

  async createScene2() {
    const layer1 = this.getLayerByIndex(1);

    const clip = await layer1.addClip(
      {
        text: `Fetching data...`,
        startTime: 1.25,
        duration: 1.25,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          textAlign: "center",
        },
      },
      { adjustLayout: false }
    );

    clip?.animationController.setAnimation(
      AnimationTypeEnum.IN,
      DOWNSCALE_INTRO_TEXT_ANIMATION
    );

    clip?.animationController.setAnimationDuration(AnimationTypeEnum.IN, 0.3);
  }

  async createScene3() {
    const layer1 = this.getLayerByIndex(1);
    const layer2 = this.getLayerByIndex(2);

    await layer1.addClip(
      {
        text: `Counting`,
        startTime: 2.5,
        duration: 2.5,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          textAlign: "center",
          position: [this.getCenterX(), 390.0889105425284],
        },
      },
      { adjustLayout: false }
    );

    const clip = await layer2.addClip(
      {
        text: ``,
        startTime: 2.5,
        duration: 2.5,
        style: {
          fontSize: 110,
          fontFamily: "Inter",
          fontWeight: "700",
          textAlign: "center",
          color: "#FFEA28",
          position: [this.getCenterX(), 663.8408889168289],
        },
      },
      { adjustLayout: false }
    );

    clip?.animationController.setAnimation(
      AnimationTypeEnum.IN,
      COUNTING_INTRO_TEXTS_ANIMATION
    );

    clip?.animationController.setAnimationDuration(AnimationTypeEnum.IN, 2.5);
  }

  async createScene4() {
    const layer1 = this.getLayerByIndex(1);
    const layer2 = this.getLayerByIndex(2);
    const layer3 = this.getLayerByIndex(3);
    const layer4 = this.getLayerByIndex(4);

    await layer1.addClip(
      {
        text: `Your 2024 Github Wrapped is ready!`,
        startTime: 5,
        duration: 2.5,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          textAlign: "center",
          wordWrapWidth: 1000,
          position: [this.getCenterX(), 592.1433507260954],
        },
      },
      { adjustLayout: false }
    );

    await layer2.addClip(
      {
        htmlText: `Hey <span style="color:white; background-color: #5c8afd; border-radius: 16px; padding: 10px 20px">${this.data.username}</span>`,
        startTime: 5,
        duration: 2.5,
        fonts: ["Inter"],
        htmlStyle: {
          fontSize: 50,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          align: "center",
          padding: 32,
        },
        style: {
          position: [650, 300],
          scale: [1, 0.8],
        },
      },
      { adjustLayout: false }
    );

    const tada = await layer3.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.TADA],
        startTime: 5,
        duration: 2.5,
        style: {
          position: [this.getCenterX(), 900],
          scale: [1.3, 1.3],
        },
      },
      { adjustLayout: false }
    );

    tada?.animationController.setAnimation(
      AnimationTypeEnum.IN,
      ICON_POPUP_ANIMATION
    );
    tada?.animationController.setAnimationDuration(AnimationTypeEnum.IN, 0.4);

    const profileClip = await layer4.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.PROFILE],
        startTime: 5,
        duration: 2.5,
        style: {
          position: [244.52288929402158, 280],
          scale: [0.5549841059856068, 0.5549841059856068],
          cornerRadius: [230, 230, 230, 230],
        },
      },
      { adjustLayout: false }
    );

    profileClip?.animationController.setAnimation(
      AnimationTypeEnum.IN,
      ROTATE_PROFILE_PICTURE_ANIMATION
    );

    profileClip?.animationController.setAnimationDuration(
      AnimationTypeEnum.IN,
      2
    );
  }

  async createScene5() {
    const layer1 = this.getLayerByIndex(1);
    const layer2 = this.getLayerByIndex(2);

    const clip = await layer1.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.HAD_FUN_GIF],
        startTime: 7.5,
        duration: 2.667,
        style: {
          scale: [4.025351230325563, 4.02533449364534],
        },
      },
      { adjustLayout: false }
    );

    const rightTrim = clip!.getDuration() - 2.667;
    clip?.setRightTrim(rightTrim);

    this.scaleClipToFitDisplay(clip!);

    await layer2.addClip(
      {
        text: `Let's see how much fun you've had this year!`,
        startTime: 7.5,
        duration: 2.667,
        style: {
          fontSize: 70,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          textAlign: "center",
          wordWrapWidth: 800,
          position: [this.getCenterX(), 650],
        },
      },
      { adjustLayout: false }
    );
  }

  async createScene6() {
    const layer1 = this.getLayerByIndex(1);
    const layer2 = this.getLayerByIndex(2);
    const layer3 = this.getLayerByIndex(3);

    await layer1.addClip(
      {
        text: `You crushed it with`,
        startTime: 10.167,
        duration: 2.333,
        style: {
          fontSize: 50,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          position: [this.getCenterX(), 468.30259508392527],
        },
      },
      { adjustLayout: false }
    );

    await layer2.addClip(
      {
        text: `${this.data.contributionsCount} contributions!`,
        startTime: 10.167,
        duration: 2.333,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          position: [this.getCenterX(), 574.7623247626831],
        },
      },
      { adjustLayout: false }
    );

    const confetti = await layer3.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.CONFETTI_VIDEO],
        startTime: 10.167,
        duration: 2.333,
        rightTrim: 3.7,
        style: {
          position: [this.getCenterX(), 810],
        },
      },
      { adjustLayout: false }
    );

    confetti?.addEffect(
      new Effect({
        sourceId: "lumaKey",
        fragmentSrc: LUMA_KEY_SHADER,
        textureWidth: confetti.style.getRawWidth(),
        textureHeight: confetti.style.getRawHeight(),
        frameWidth: confetti.style.getRawWidth(),
        frameHeight: confetti.style.getRawHeight(),
        uniforms: {},
      })
    );

    const clip = await layer1.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.CONTRIBUTIONS_GIF],
        startTime: 12.5,
        duration: 2.458,
        style: {
          scale: [2.2832086502797493, 2.2832086502797493],
        },
      },
      { adjustLayout: false }
    );

    const rightTrim = clip!.getDuration() - 2.458;
    clip?.setRightTrim(rightTrim);

    this.scaleClipToFitDisplay(clip!);
  }

  private async createCountdownScene(
    text: { value: string; startTime: number; duration: number },
    count: { value: number; startTime: number; duration: number }
  ) {
    const layer1 = this.getLayerByIndex(1);
    const layer2 = this.getLayerByIndex(2);

    await layer1.addClip(
      {
        text: text.value,
        startTime: text.startTime,
        duration: text.duration,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          position: [this.getCenterX(), 668.1853460740554],
        },
      },
      { adjustLayout: false }
    );

    const countPositionY = 457.4403910228201;

    const countClip = await layer2.addClip(
      {
        text: "",
        startTime: count.startTime,
        duration: count.duration,
        style: {
          fontSize: 200,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          position: [this.getCenterX(), countPositionY],
        },
      },
      { adjustLayout: false }
    );

    countClip?.animationController.setAnimation(
      AnimationTypeEnum.IN,
      getCountUpAnimation(count.value, countPositionY, count.duration)
    );

    countClip?.animationController.setAnimationDuration(
      AnimationTypeEnum.IN,
      count.duration
    );
  }

  async createScene7() {
    await this.createCountdownScene(
      {
        value: `commits`,
        startTime: 14.958,
        duration: 2.417,
      },
      {
        value: this.data.commitsCount,
        startTime: 14.958,
        duration: 2.417,
      }
    );
  }

  async createScene8() {
    await this.createCountdownScene(
      {
        value: `pull requests`,
        startTime: 17.375,
        duration: 2.583,
      },
      {
        value: this.data.pullRequestsCount,
        startTime: 17.375,
        duration: 2.583,
      }
    );
  }

  async createScene9() {
    await this.createCountdownScene(
      {
        value: `opened issues`,
        startTime: 19.958,
        duration: 2.583,
      },
      {
        value: this.data.openedIssuesCount,
        startTime: 19.958,
        duration: 2.583,
      }
    );
  }

  async createScene10() {
    const layer1 = this.getLayerByIndex(1);
    const layer2 = this.getLayerByIndex(2);

    const clip = await layer1.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.GOOD_ACTIVITY_GIF],
        startTime: 22.542,
        duration: 2.333,
        style: {
          scale: [3.902087153794914, 3.902083550848141],
        },
      },
      { adjustLayout: false }
    );

    const rightTrim = clip!.getDuration() - 2.333;
    clip?.setRightTrim(rightTrim);

    this.scaleClipToFitDisplay(clip!);

    await layer2.addClip(
      {
        text: `That's not bad`,
        startTime: 22.542,
        duration: 2.333,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
        },
      },
      { adjustLayout: false }
    );
  }

  async createScene11() {
    const layer1 = this.getLayerByIndex(1);
    const layer2 = this.getLayerByIndex(2);
    const layer3 = this.getLayerByIndex(3);

    const calendar = await layer1.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.CALENDAR],
        startTime: 24.875,
        duration: 2.5,
        style: {
          position: [this.getCenterX(), 230],
          scale: [1, 1],
        },
      },
      { adjustLayout: false }
    );

    calendar?.animationController.setAnimation(
      AnimationTypeEnum.IN,
      ICON_POPUP_ANIMATION
    );
    calendar?.animationController.setAnimationDuration(
      AnimationTypeEnum.IN,
      0.4
    );

    await layer2.addClip(
      {
        text: `You were the most productive on`,
        startTime: 24.875,
        duration: 2.5,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          textAlign: "center",
          wordWrapWidth: 1000,
        },
      },
      { adjustLayout: false }
    );

    const dayText = await layer3.addClip(
      {
        text: this.data.mostProductiveDay,
        startTime: 25.875,
        duration: 1.5,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          fontWeight: "600",
          color: "#FFEA28",
          position: [this.getCenterX(), 846.3416747343936],
        },
      },
      { adjustLayout: false }
    );

    dayText?.animationController.setAnimation(
      AnimationTypeEnum.IN,
      PRODUCTIVE_DAY_ANIMATION
    );

    dayText?.animationController.setAnimationDuration(
      AnimationTypeEnum.IN,
      0.3
    );
  }

  async createScene12() {
    const layer1 = this.getLayerByIndex(1);
    const layer2 = this.getLayerByIndex(2);

    const clip = await layer1.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.PRODUCTIVE_STRANGE_HOUR],
        startTime: 27.375,
        duration: 2.5,
        style: {
          scale: [6.974728107122646, 6.974728107122646],
        },
      },
      { adjustLayout: false }
    );

    const rightTrim = clip!.getDuration() - 2.5;
    clip?.setRightTrim(rightTrim);

    this.scaleClipToFitDisplay(clip!);

    const text = await layer2.addClip(
      {
        text: `at ${this.data.mostProductiveHour}??`,
        startTime: 27.375,
        duration: 2.5,
        style: {
          fontSize: 150,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          textAlign: "center",
        },
      },
      { adjustLayout: false }
    );

    text?.animationController.setAnimation(
      AnimationTypeEnum.IN,
      DOWNSCALE_INTRO_TEXT_ANIMATION
    );

    text?.animationController.setAnimationDuration(AnimationTypeEnum.IN, 0.4);
  }

  async createScene13() {
    await this.createCountdownScene(
      {
        value: `repositories created`,
        startTime: 29.875,
        duration: 2.458,
      },
      {
        value: this.data.repositoriesCreatedCount,
        startTime: 29.875,
        duration: 2.458,
      }
    );
  }

  async createScene14() {
    const layer1 = this.getLayerByIndex(1);
    const layer2 = this.getLayerByIndex(2);
    const layer3 = this.getLayerByIndex(3);
    const layer4 = this.getLayerByIndex(4);

    const clip = await layer1.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.STARS_GIF],
        startTime: 32.333,
        duration: 2.542,
        style: {
          scale: [3.881129099754428, 3.8811194764197494],
        },
      },
      { adjustLayout: false }
    );

    const rightTrim = clip!.getDuration() - 2.542;
    clip?.setRightTrim(rightTrim);

    this.scaleClipToFitDisplay(clip!);

    await layer2.addClip(
      {
        text: `and got`,
        startTime: 32.333,
        duration: 2.542,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          position: [301.0099269503992, 459.6130194254102],
        },
      },
      { adjustLayout: false }
    );

    await layer3.addClip(
      {
        text: `${this.data.starsReceivedCount} stars`,
        startTime: 32.333,
        duration: 2.542,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          fontWeight: "600",
          backgroundColor: "#FFFFFF",
          color: "#FF63A1",
          position: [731.1904369145659, 463.9582762305903],
          padding: [50, 0],
          cornerRadius: [24, 24, 24, 24],
        },
      },
      { adjustLayout: false }
    );

    const star = await layer4.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.STAR],
        startTime: 32.333,
        duration: 2.542,
        style: {
          position: [this.getCenterX(), 800],
          scale: [1.5, 1.5],
        },
      },
      { adjustLayout: false }
    );

    star?.animationController.setAnimation(
      AnimationTypeEnum.IN,
      ROTATE_STAR_ANIMATION
    );

    star?.animationController.setAnimationDuration(AnimationTypeEnum.IN, 1);
  }

  async createScrollingTextsScene(data: {
    texts: string[];
    subtitleText: string;
    subtitleTextWrapWidth?: number;
    iconMediaDataId: string;
    startTime: number;
    duration: number;
  }) {
    const layer1 = this.getLayerByIndex(1);
    const layer2 = this.getLayerByIndex(2);
    const layer3 = this.getLayerByIndex(3);
    const layer4 = this.getLayerByIndex(4);

    const maskClip = await layer1.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.MASK_SCROLL],
        startTime: data.startTime,
        duration: data.duration,
      },
      { adjustLayout: false }
    );

    const textClip = await layer4.addClip(
      {
        text: data.texts[0],
        startTime: data.startTime,
        duration: data.duration,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          fontWeight: "600",
          color: "#FFEA28",
          textAlign: "center",
        },
      },
      { adjustLayout: false }
    );

    const initialPositionY = this.getCenterY();

    textClip?.style.setPosition(this.getCenterX(), initialPositionY);

    textClip?.animationController.setAnimation(
      AnimationTypeEnum.IN,
      getScrollingTextsAnimation(data.texts, initialPositionY)
    );

    textClip?.animationController.setAnimationDuration(
      AnimationTypeEnum.IN,
      data.duration
    );

    textClip?.addClipMask(maskClip!, {
      hideMaskClip: true,
    });

    await layer2.addClip(
      {
        text: data.subtitleText,
        startTime: data.startTime,
        duration: data.duration,
        style: {
          fontSize: 70,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          textAlign: "center",
          wordWrapWidth: data.subtitleTextWrapWidth,
          position: [this.getCenterX(), 800],
        },
      },
      { adjustLayout: false }
    );

    const icon = await layer3.addClip(
      {
        mediaDataId: data.iconMediaDataId,
        startTime: data.startTime,
        duration: data.duration,
        style: {
          position: [this.getCenterX(), 280],
          scale: [1, 1],
        },
      },
      { adjustLayout: false }
    );

    icon?.animationController.setAnimation(
      AnimationTypeEnum.IN,
      ICON_POPUP_ANIMATION
    );
    icon?.animationController.setAnimationDuration(AnimationTypeEnum.IN, 0.4);
  }

  async createScene15() {
    await this.createScrollingTextsScene({
      texts: this.data.mostUsedLanguages,
      startTime: 34.875,
      duration: 2.458,
      subtitleText: `Your favourite programming languages`,
      subtitleTextWrapWidth: 1000,
      iconMediaDataId: this.mediaAssets[MediaAssetsEnum.ROCKET],
    });
  }

  async createScene16() {
    await this.createScrollingTextsScene({
      texts: this.data.starredRepositories,
      startTime: 37.333,
      duration: 2.5,
      subtitleText: `Repositories you liked`,
      subtitleTextWrapWidth: 700,
      iconMediaDataId: this.mediaAssets[MediaAssetsEnum.WRENCH],
    });
  }

  async createScene17() {
    const layer1 = this.getLayerByIndex(1);
    const layer2 = this.getLayerByIndex(2);

    const clip = await layer1.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.INTERESTING_CHOICE_GIF],
        startTime: 39.833,
        duration: 2.5,
        style: {
          scale: [3.1343871371953944, 3.1343840517845214],
        },
      },
      { adjustLayout: false }
    );

    const rightTrim = clip!.getDuration() - 2.5;
    clip?.setRightTrim(rightTrim);

    this.scaleClipToFitDisplay(clip!);

    const texts = ["That was fun!", "Nice job!"];
    const textContent = texts[Math.floor(Math.random() * texts.length)];

    const text = await layer2.addClip(
      {
        text: textContent,
        startTime: 39.833,
        duration: 2.5,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          textAlign: "center",
        },
      },
      { adjustLayout: false }
    );

    text?.animationController.setAnimation(
      AnimationTypeEnum.IN,
      DOWNSCALE_INTRO_TEXT_ANIMATION
    );

    text?.animationController.setAnimationDuration(AnimationTypeEnum.IN, 0.5);
  }

  async createScene18() {
    const layer1 = this.getLayerByIndex(1);

    await layer1.addClip(
      {
        text: `Liked this?`,
        startTime: 42.333,
        duration: 2.5,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
        },
      },
      { adjustLayout: false }
    );
  }

  async createScene19() {
    const layer1 = this.getLayerByIndex(1);

    await layer1.addClip(
      {
        text: `Get your GitHub Wrapped`,
        startTime: 44.833,
        duration: 2.417,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          textAlign: "center",
          wordWrapWidth: 800,
        },
      },
      { adjustLayout: false }
    );
  }

  async createScene20() {
    const layer1 = this.getLayerByIndex(1);
    const layer2 = this.getLayerByIndex(2);
    const layer3 = this.getLayerByIndex(3);

    await layer1.addClip(
      {
        text: `on`,
        startTime: 47.25,
        duration: 2.542,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          color: "#FFFFFF",
          fontWeight: "600",
          position: [this.getCenterX(), 310],
        },
      },
      { adjustLayout: false }
    );

    await layer2.addClip(
      {
        text: `rendley.com/wrapped`,
        startTime: 47.25,
        duration: 2.542,
        style: {
          fontSize: 100,
          fontFamily: "Inter",
          fontWeight: "600",
          textAlign: "center",
          color: "#FFEA28",
          wordWrapWidth: 650,
        },
      },
      { adjustLayout: false }
    );

    const hand = await layer3.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.HAND],
        startTime: 47.25,
        duration: 2.542,
        style: {
          scale: [0.2, 0.2],
          position: [this.getCenterX(), 1000],
        },
      },
      { adjustLayout: false }
    );

    hand?.animationController.setAnimation(
      AnimationTypeEnum.IN,
      HAND_ANIMATION
    );

    hand?.animationController.setAnimationDuration(AnimationTypeEnum.IN, 2.542);
  }

  async createScene21() {
    const layer1 = this.getLayerByIndex(1);
    const layer2 = this.getLayerByIndex(2);

    const clip = await layer1.addClip(
      {
        mediaDataId: this.mediaAssets[MediaAssetsEnum.BYE_GIF],
        startTime: 49.792,
        duration: 3.167,
        style: {
          scale: [4, 4],
        },
      },
      { adjustLayout: false }
    );

    const rightTrim = clip!.getDuration() - 3.167;
    clip?.setRightTrim(rightTrim);

    this.scaleClipToFitDisplay(clip!);

    const fadeRect = await layer2.addClip(
      {
        type: "shape",
        shape: "rectangle",
        startTime: 49.792,
        duration: 3.18, // TODO: Investigate this <--- if it will have the same duration as the gif above it will result in one frame short
        style: {
          width: 1080,
          height: 1080,
          fillColor: "#000000",
          alpha: 1,
        },
      },
      { adjustLayout: false }
    );

    fadeRect?.animationController.setAnimation(
      AnimationTypeEnum.OUT,
      FADE_OUT_ANIMATION
    );
    fadeRect?.animationController.setAnimationDuration(
      AnimationTypeEnum.OUT,
      2
    );
  }
}
