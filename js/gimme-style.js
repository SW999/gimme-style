if (typeof GimmeStyle === 'undefined') {
    const GimmeStyle = {
        constants: {
            cssGS: `.dashboard-wrapper-GS,.dashboard-wrapper-GS *,.dashboard-wrapper-GS :after,.dashboard-wrapper-GS :before{box-sizing:border-box}html{height:100%}body{width:100%;min-height:100%;position:absolute}.dashboard-wrapper-GS{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.dashboard-GS,.info-GS,.selected-GS{pointer-events:all}.selected-GS{outline:green dashed thin}.dashboard-GS{position:sticky;top:1px;float:right;display:flex;justify-content:flex-end;flex-wrap:wrap;gap:8px;width:348px;margin:0;padding:4px;border:2px dashed green;border-radius:4px;background-color:#fff;color:#383428}.copy-option-GS{display:flex;align-content:center;flex-wrap:wrap;gap:4px;height:22px;padding:0 5px;border:2px solid currentColor;border-radius:4px;font-size:12px;line-height:22px;cursor:pointer}.copy-option-GS input,.copy-option-GS label{pointer-events:none}.destroy-GS,.pause-GS,.unlock-GS,.about-GS{position:relative;display:block;cursor:pointer}.destroy-GS::after,.destroy-GS::before,.pause-GS::before,.unlock-GS::after,.unlock-GS::before,.about-GS::after,.about-GS::before{content:"";display:block;position:absolute}.destroy-GS::after,.destroy-GS::before{width:12px;height:2px;background:currentColor;transform:rotate(45deg);border-radius:5px;top:8px;left:3px}.destroy-GS::after{transform:rotate(-45deg)}.destroy-GS,.pause-GS{width:22px;height:22px;border:2px solid;border-radius:4px}.pause-GS::before{left:6px;top:6px;width:6px;height:6px;border-left:2px solid;border-right:2px solid}.pause-GS.play-GS::before{top:4px;left:7px;width:0;height:10px;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:6px solid;border-right:0}.unlock-GS{width:12px;height:10px;border:2px solid;border-top-right-radius:100px;border-top-left-radius:100px;border-bottom-color:transparent;border-right-color:transparent}.unlock-GS.lock-GS{border-top-right-radius:50%;border-top-left-radius:50%;border-right-color:currentColor}.unlock-GS::after{left:-4px;top:8px;width:16px;height:10px;border-radius:2px;border:2px solid transparent;box-shadow:0 0 0 2px}.unlock-GS::before{left:3px;top:10px;width:2px;height:5px;background:currentColor}.about-GS{width:20px;height:20px;border:2px solid;border-radius:40px}.about-GS::after,.about-GS::before{border-radius:3px;width:2px;left:7px;background:currentColor}.about-GS::after{bottom:2px;height:8px}.about-GS::before{top:2px;height:2px}.about-info-GS{border:2px solid orange;border-radius:4px;flex-grow:1;padding:5px;color:#000;font-size:14px;line-height:1.2}.info-GS{position:absolute;width:auto;min-width:100px;max-width:400px;min-height:100px;max-height:90vh;padding:10px;border:thin solid silver;border-radius:4px;background-color:#383428;color:#00ff2b;font-size:13px;transition:transform .4s;overflow-y:auto;white-space:pre-wrap}.info-GS.locked{border:thin solid orange;border-radius:2px;background-color:#383433;color:#0fb}.info-GS::before{content:"Copied!";position:absolute;top:22px;left:50%;display:none;font-size:24px;color:orange;transform:translateX(-50%)}.info-GS.copied::before{display:block;animation:.6s 2 pulse-GS}.info-GS::-webkit-scrollbar-track{background-color:transparent;border-radius:6px}.info-GS::-webkit-scrollbar{width:6px;background-color:transparent}.info-GS::-webkit-scrollbar-thumb{border-radius:6px;background-color:#4d9c41}.hide-GS{display:none!important}@keyframes pulse-GS{from,to{transform:scale3d(1,1,1) translateX(-50%)}50%{transform:scale3d(1.09,1.09,1.09) translateX(-50%)}}`,
            dashboardId: 'dashboardWrapperGS',
            hideClass: 'hide-GS',
            highlightClass: 'selected-GS',
            info: null,
            infoId: 'infoGS',
            initialized: false,
            prevTarget: null,
            result: '',
            stylesId: 'stylesGS',
            uniqKeyFrames: new Set(),
            uniqStyles: new Set(),
        },

        settings: {
            freeze: false, // freeze popup position
            lock: false, // toggle possibility of popup freeze after next click on the site element
            needChildCss: false,
            needHtml: false,
            pause: false,
        },

        addUI: function () {
            let { dashboardId, infoId, stylesId, cssGS } = this.constants;
            const dashboard = document.createElement('div');
            dashboard.id = dashboardId;
            dashboard.className = 'dashboard-wrapper-GS';
            dashboard.innerHTML = `<div class="dashboard-GS">
    <div class="about-GS" title="Toggle About section"></div>
    <div class="copy-option-GS" title="Copy CSS of all children"><input type="checkbox" id="copyCss" value="needChildCss" /><label for="copyCss">Copy childs' CSS</label></div>
    <div class="copy-option-GS" title="Copy inner HTML"><input type="checkbox" id="copyHtml" value="needHtml" /><label for="copyHtml">Copy HTML</label></div>
    <div class="unlock-GS" title="Feeze tooltip on click"></div>
    <div class="pause-GS" title="Pause"></div>
    <div class="destroy-GS" title="Destroy"></div>
    <div class="about-info-GS hide-GS"><strong>Gimme Style</strong> helps to check and copy an element's CSS styles. Hover the cursor on the element to see CSS, and click to copy.<br/><br/>Click the '<strong>lock</strong>' icon and a popup with CSS will be frozen after clicking on the element. The second click on the '<strong>lock</strong>' icon will unfreeze a popup.<br/><br/>In addition, you may copy the HTML code and CSS of element children on demand.</div>
</div>
<pre id="${infoId}" class="info-GS hide-GS"></pre>`;

            const additionalStyles = document.createElement('style');
            additionalStyles.id = stylesId;
            additionalStyles.innerText = cssGS;

            document.body.insertBefore(dashboard, document.body.firstChild);
            document.body.appendChild(additionalStyles);
            this.constants.info = document.getElementById(infoId);
        },

        togglePause: () => {
            const self = GimmeStyle;
            const { pause } = self.settings;
            const { info, hideClass } = self.constants;
            const btn = document.querySelector('.pause-GS');
            self.settings.pause = !pause;

            btn.classList.toggle('play-GS');
            info.classList.toggle(hideClass);
            btn.title = pause ? 'Pause' : 'Play';
        },

        toggleLock: () => {
            const self = GimmeStyle;
            const { lock, freeze } = self.settings;
            const btn = document.querySelector('.unlock-GS');

            self.settings.lock = !lock;
            btn.classList.toggle('lock-GS');
            btn.title = lock ? 'Freeze tooltip when clicking on the element' : 'Don\'t freeze tooltip on click';

            if (freeze && !lock) {
                self.toggleFreeze();
            }
        },

        toggleAbout: () => {
            document.querySelector('.about-info-GS').classList.toggle(GimmeStyle.constants.hideClass);
        },

        toggleFreeze: () => {},

        init: function () {
            console.log("GimmeStyle initialized");

            this.addUI();
            document.querySelector('.destroy-GS').addEventListener('click', this.destroy);
            document.querySelector('.pause-GS').addEventListener('click', this.togglePause);
            document.querySelector('.unlock-GS').addEventListener('click', this.toggleLock);
            document.querySelector('.about-GS').addEventListener('click', this.toggleAbout);

        },
        destroy: function () {
            console.log("GimmeStyle destroyed");

            document.querySelector('.destroy-GS').removeEventListener('click', this.destroy);
            document.querySelector('.pause-GS').removeEventListener('click', this.togglePause);
            document.querySelector('.unlock-GS').removeEventListener('click', this.toggleLock);
            document.querySelector('.about-GS').removeEventListener('click', this.toggleAbout);
        }
    };

    GimmeStyle.init();
} else {
    GimmeStyle.destroy();
}