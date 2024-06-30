if (typeof window.GimmeStyle === 'undefined') {
    window.GimmeStyle = {
        constants: {
            cssGS: '.dashboard-wrapper-GS,.dashboard-wrapper-GS *,.dashboard-wrapper-GS :after,.dashboard-wrapper-GS :before{box-sizing:border-box}html{height:100%}body{width:100%;min-height:100%;position:absolute}.dashboard-wrapper-GS{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.dashboard-GS,.info-GS,.selected-GS{pointer-events:all}.selected-GS{outline:green dashed thin}.dashboard-GS{box-shadow:rgba(0, 0, 0, 0.16) 0 3px 6px, rgba(0, 0, 0, 0.23) 0 3px 6px;position:sticky;top:3px;float:right;display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:8px;width:354px;margin:0 5px 0 0;padding:4px;border:thin solid silver;border-radius:4px;background-color:#fff;color:#383428}.copy-option-GS{display:flex;align-content:center;flex-wrap:wrap;gap:4px;height:22px;padding:0 5px;border:2px solid orange;border-radius:4px;font-size:12px;line-height:22px;cursor:pointer}.copy-option-GS input,.copy-option-GS label{pointer-events:none}.destroy-GS,.pause-GS,.unlock-GS,.about-GS{position:relative;display:block;cursor:pointer}.destroy-GS::after,.destroy-GS::before,.pause-GS::before,.unlock-GS::after,.unlock-GS::before,.about-GS::after,.about-GS::before{content:"";display:block;position:absolute}.destroy-GS::after,.destroy-GS::before{width:12px;height:2px;background:currentColor;transform:rotate(45deg);border-radius:5px;top:8px;left:3px}.destroy-GS::after{transform:rotate(-45deg)}.destroy-GS,.pause-GS{width:22px;height:22px;border:2px solid orange;border-radius:4px}.pause-GS::before{left:6px;top:6px;width:6px;height:6px;border-left:2px solid;border-right:2px solid}.pause-GS.play-GS::before{top:4px;left:7px;width:0;height:10px;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:6px solid;border-right:0}.unlock-GS{top:-6px;width:13px;height:9px;margin:0 3px;border:2px solid orange;border-top-right-radius:100px;border-top-left-radius:100px;border-bottom-color:transparent;border-right-color:transparent}.unlock-GS.lock-GS{border-top-right-radius:50%;border-top-left-radius:50%;border-right-color:orange}.unlock-GS::after{left:-5px;top:6px;width:20px;height:13px;border-radius:3px;border:2px solid orange}.unlock-GS::before{left:3px;top:10px;width:4px;height:6px;border-radius:2px;border:thin solid white;border-top:4px solid black;background:currentColor}.about-GS{width:20px;height:20px;border:2px solid orange;border-radius:50%}.about-GS::after,.about-GS::before{border-radius:3px;width:2px;left:50%;background:currentColor;transform:translateX(-50%)}.about-GS::after{bottom:2px;height:8px}.about-GS::before{top:2px;height:2px}.about-info-GS{border:2px solid orange;border-radius:4px;flex-grow:1;padding:5px;color:#000;font-size:14px;line-height:1.2}.info-GS{position:absolute;width:auto;min-width:100px;max-width:400px;min-height:100px;max-height:90vh;padding:10px;border:thin solid silver;border-radius:4px;background-color:#383428;color:#00ff2b;font-size:13px;transition:transform .4s;overflow-y:auto;white-space:pre-wrap}.info-GS.locked{border:thin solid orange;border-radius:2px;background-color:#383433;color:#0fb}.info-GS::before{content:"Copied!";position:absolute;top:22px;left:50%;display:none;font-size:24px;color:orange;transform:translateX(-50%)}.info-GS.copied::before{display:block;animation:.6s 2 pulse-GS}.info-GS::-webkit-scrollbar-track{background-color:transparent;border-radius:6px}.info-GS::-webkit-scrollbar{width:6px;background-color:transparent}.info-GS::-webkit-scrollbar-thumb{border-radius:6px;background-color:#4d9c41}.hide-GS{display:none!important}@keyframes pulse-GS{from,to{transform:scale3d(1,1,1) translateX(-50%)}50%{transform:scale3d(1.09,1.09,1.09) translateX(-50%)}}',
            dashboardId: 'dashboardWrapperGS',
            delay: 2000,
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

        addUI() {
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
            const self = window.GimmeStyle;
            const { pause } = self.settings;
            const { info, hideClass } = self.constants;
            const btn = document.querySelector('.pause-GS');
            self.settings.pause = !pause;

            btn.classList.toggle('play-GS');
            info.classList.toggle(hideClass);
            btn.title = pause ? 'Pause' : 'Play';
        },

        toggleLock() {
            const self = window.GimmeStyle;
            const { lock, freeze } = self.settings;
            const btn = document.querySelector('.unlock-GS');

            self.settings.lock = !lock;
            btn.classList.toggle('lock-GS');
            btn.title = lock ? 'Freeze tooltip when clicking on the element' : 'Don\'t freeze tooltip on click';

            if (freeze && !self.settings.lock) {
                self.toggleFreeze();
            }
        },

        toggleAbout() {
            document.querySelector('.about-info-GS').classList.toggle(window.GimmeStyle.constants.hideClass);
        },

        toggleFreeze() {
            this.settings.freeze = !this.settings.freeze;
            document.getElementById(this.constants.infoId).classList.toggle('locked');
        },

        handleMouseOver(e) {
            const self = window.GimmeStyle;
            const { pause, freeze } = self.settings;
            let { highlightClass, initialized, hideClass } = self.constants;

            if (pause) {
                self.cleanHighlightClass();
            } else {
                e.preventDefault();

                const target = e.target;

                if (freeze || self.isDashboard(target)) {
                    return;
                }

                self.constants.prevTarget?.classList.remove(highlightClass);

                self.constants.uniqStyles.clear();
                self.constants.uniqKeyFrames.clear();
                self.constants.result = '';

                if (!initialized) {
                    self.constants.info.classList.remove(hideClass);
                    self.constants.initialized = true;
                }

                self.constants.prevTarget = target;

                target.classList.add(highlightClass);

                let result = self.getElStyles(target);

                self.constants.result = result;
                self.movePopup(target);

                result = `${self.getSelectorName(target)}    ${target.offsetWidth}×${target.offsetHeight}px
----------------
${result}`;

                self.constants.info.innerText = result.trim(); // Show styles in popup
            }
        },

        movePopup(el) {
            if (this.settings.pause) {
                return;
            }

            const delta = 7;
            const { width: infoWidth, height: infoHeight } = this.constants.info.getBoundingClientRect();
            const { width: elWidth, x, y } = el.getBoundingClientRect();
            const { scrollX, scrollY, innerWidth, innerHeight } = window;
            let infoX = x + scrollX + elWidth - delta;
            let infoY = y + scrollY + delta;

            if (infoX + infoWidth > innerWidth + scrollX) {
                infoX = x + scrollX - infoWidth + delta >= 0 ? x + scrollX - infoWidth + delta : x + scrollX;
            }

            if (infoY < scrollY) {
                infoY = scrollY + delta;
            } else if (infoY + infoHeight > scrollY + innerHeight) {
                infoY = infoY - infoHeight >= scrollY ? infoY - infoHeight : scrollY + delta;
            }

            this.constants.info.style.transform = `translate(${infoX}px, ${infoY}px)`;
        },

        getElStyles(el) {
            const { highlightClass, stylesId } = this.constants;
            const allRules = [...document.styleSheets].reduce((res, s) => {
                try {
                    if (s.ownerNode.id !== stylesId) {
                        res.push(...s.cssRules);
                    }
                } catch (e) { // cross-domain stylesheets with restrictive CORS headers
                    this.constants.result = `Error: ${e.message}
If it happens with local files, please restart your browser with flag "--allow-file-access-from-files"!`;
                }

                return res;
            }, []).flat();

            const defaultRules = [];
            const hoverRules = [];
            const activeRules = [];
            const visitedRules = [];
            const focusRules = [];
            const focusWithinRules = [];
            const beforeRules = [];
            const afterRules = [];
            const keyframesRules = [];
            const allStyleRules = [];

            allRules.forEach((rule) => {
                if (rule.type === window.CSSRule.STYLE_RULE) {
                    if (el.matches(rule.selectorText)) {
                        if (rule.selectorText !== `.${highlightClass}`) {
                            defaultRules.push(rule);
                            allStyleRules.push(rule);
                        }
                    } else if (el.matches(rule.selectorText.replace(/ :/g, ' *:').replace(/([^(])(:hover)\b/g, '$1'))) {
                        hoverRules.push(rule);
                        allStyleRules.push(rule);
                    } else if (el.matches(rule.selectorText.replace(/ :/g, ' *:').replace(/([^(])(:active)\b/g, '$1'))) {
                        activeRules.push(rule);
                        allStyleRules.push(rule);
                    } else if (el.matches(rule.selectorText.replace(/ :/g, ' *:').replace(/([^(])(:visited)\b/g, '$1'))) {
                        visitedRules.push(rule);
                        allStyleRules.push(rule);
                    } else if (el.matches(rule.selectorText.replace(/ :/g, ' *:').replace(/([^(])(:focus)\b/g, '$1'))) {
                        focusRules.push(rule);
                        allStyleRules.push(rule);
                    } else if (el.matches(rule.selectorText.replace(/ :/g, ' *:').replace(/([^(])(:focus-within)\b/g, '$1'))) {
                        focusWithinRules.push(rule);
                        allStyleRules.push(rule);
                    } else if (el.matches(rule.selectorText.replace(/ :/g, ' *:').replace(/::before\b/g, ''))) {
                        beforeRules.push(rule);
                        allStyleRules.push(rule);
                    } else if (el.matches(rule.selectorText.replace(/ :/g, ' *:').replace(/::after\b/g, ''))) {
                        afterRules.push(rule);
                        allStyleRules.push(rule);
                    }
                } else if (rule.type === window.CSSRule.KEYFRAMES_RULE) {
                    keyframesRules.push(rule);
                }
            });

            const animationNames = allStyleRules.reduce((res, rule) => {
                if (rule.style.animationName) {
                    res.push(rule.style.animationName);
                }
                return res;
            }, []);
            const keyframeStyles = keyframesRules.reduce((res, rule) => {
                if (animationNames.includes(rule.name)) {
                    const css = rule.cssText;
                    if (this.constants.uniqKeyFrames.has(css)) {
                        return res;
                    }

                    this.constants.uniqKeyFrames.add(css);

                    return `${res}${rule.cssText}\n\n`;
                }

                return res;
            }, '');

            let defaultStyles = this.getStylesByRules(defaultRules);

            let inlineStyles = (el.getAttribute('style') ?? '').trim();

            // Add inline styles
            if (inlineStyles !== '') {
                inlineStyles = inlineStyles
                    .replace(/:\s*/g, ': ')
                    .replace(/;?$/, ';')
                    .replace(/;\s*(?!$)/g, ';\n    ');

                defaultStyles = defaultStyles.replace(/}\n\n$/, `    ${inlineStyles}\n}\n\n`);
            }

            let result = [beforeRules, afterRules, hoverRules, activeRules, visitedRules, focusRules, focusWithinRules]
                .reduce((res, styles) => {
                    return Boolean(styles) ? `${res}${this.getStylesByRules(styles)}` : res;
                }, defaultStyles);

            return result === '' ? '' : `${result}${keyframeStyles}`;
        },

        getStylesByRules(rules) {
            return rules.reduce((res, rule) => {
                const css = rule.cssText;

                if (this.settings.needChildCss) {
                    if(this.constants.uniqStyles.has(css)) {
                        return res;
                    }

                    this.constants.uniqStyles.add(css);
                }

                let separator = '\n    ';

                if (res === '' || res.endsWith('}\n\n')) {
                    separator = '';
                }

                return `${res}${separator}${css
                    .replace(/^(.*?) {/g, (m) => m.replace(/,\s+/g, ',\n'))
                    .replace(/(\s+0px)/g, ' 0')
                    .replace(/({ )/g, '{\n  ')
                    .replace(/(; })/g, ';\n}\n\n')
                    .replace(/(; )/g, ';\n  ')}`;
            }, '');
        },

        addChildrenStyles(el) {
            const childSelectors = [];
            const children = el.querySelectorAll('*');

            Array.from(children).forEach((child) => {
                if (this.isDashboard(child)) { // Ignore GS dashboard styles
                    return;
                }

                const selector = this.getSelectorName(child);

                if (selector === '' || childSelectors.includes(selector)) {
                    return;
                }

                childSelectors.push(selector);
                this.constants.result = this.constants.result + this.getElStyles(child);
            });
        },

        toggleCopyOption(e) {
            const self = window.GimmeStyle;
            const target = e.currentTarget;
            const input = target.children[0];
            const val = input.value;

            self.settings[val] = !self.settings[val];
            input.checked = !input.checked;
        },

        copyStylesOfSelectedEl(e) {
            e.preventDefault();

            const target = e.target;
            const self = window.GimmeStyle;
            const { freeze, lock, needHtml, needChildCss } = self.settings;
            const { infoId, delay } = self.constants;

            if (freeze || self.isDashboard(target)) {
                return;
            }

            if (lock && !freeze) {
                self.toggleFreeze();
            }

            if (needChildCss) {
                self.addChildrenStyles(target);
            }

            let textToCopy = self.constants.result.trim();

            if (needHtml) {
                const html = self.getHtmlString(target);

                textToCopy = `${textToCopy}

----------------
${html}`;
            }

            navigator.clipboard.writeText(textToCopy).then(() => {
                const popup = document.getElementById(infoId);
                const copied = 'copied';

                popup.classList.add(copied);

                setTimeout(() => {
                    popup.classList.remove(copied);
                }, delay);
            });
        },

        // Utils
        isDashboard(target) {
            const id = this.constants.dashboardId;

            return target.id === id || target.closest(`#${id}`);
        },

        cleanHighlightClass() {
            const { highlightClass } = this.constants;

            document.querySelector(`.${highlightClass}`)?.classList.remove(highlightClass);
        },

        getSelectorName(el) {
            const { highlightClass } = this.constants;
            const tag = el.tagName.toLowerCase();
            let selector = tag;

            if (['script', 'style'].includes(tag)) {
                return '';
            }

            if (el.className && el.className !== highlightClass) {
                const re = new RegExp(`(\\s+${highlightClass})`, 'g');
                selector = `${selector}.${el.className.replace(re, '').replace(/\s+/g, '.')}`;
            } else if (el.id) {
                selector = `${selector}#${el.id}`;
            }

            return selector;
        },

        getHtmlString(target) {
            const { dashboardId, stylesId } = this.constants;
            let html = target.outerHTML.replace('selected-GS', '');

            if (html.startsWith('<body')) {
                let tempDiv = document.createElement('div');
                const bodyTag = html.substring(0, html.indexOf('>') + 1).replace(' class=""', '');

                tempDiv.innerHTML = html;

                [dashboardId, stylesId].forEach((id) => {
                    let elementToRemove = tempDiv.querySelector(`#${id}`);

                    if (elementToRemove) {
                        elementToRemove.remove();
                    }
                });

                html = `${bodyTag}
${tempDiv.innerHTML.trim()}
</body>`;
            }

            return html;
        },

        init() {
            console.log('GimmeStyle initialized');

            this.addUI();
            document.querySelector('.destroy-GS').addEventListener('click', this.destroy);
            document.querySelector('.pause-GS').addEventListener('click', this.togglePause);
            document.querySelector('.unlock-GS').addEventListener('click', this.toggleLock);
            document.querySelector('.about-GS').addEventListener('click', this.toggleAbout);
            document.querySelectorAll('.copy-option-GS').forEach((el) => {
                el.addEventListener('click', this.toggleCopyOption);
            });
            document.addEventListener('mouseover', this.handleMouseOver);
            document.addEventListener('click', this.copyStylesOfSelectedEl);
        },

        destroy() {
            console.log('GimmeStyle destroyed');

            this.cleanHighlightClass();
            document.querySelector('.destroy-GS').removeEventListener('click', this.destroy);
            document.querySelector('.pause-GS').removeEventListener('click', this.togglePause);
            document.querySelector('.unlock-GS').removeEventListener('click', this.toggleLock);
            document.querySelector('.about-GS').removeEventListener('click', this.toggleAbout);
            document.querySelectorAll('.copy-option-GS').forEach((el) => {
                el.removeEventListener('click', this.toggleCopyOption);
            });
            document.removeEventListener('mouseover', this.handleMouseOver);
            document.removeEventListener('click', this.copyStylesOfSelectedEl);

            delete window.GimmeStyle;
        }
    };

    window.GimmeStyle.init();
} else {
    window.GimmeStyle.destroy();
}
