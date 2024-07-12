if (typeof window.GimmeStyle === 'undefined') {
    let self = null;

    window.GimmeStyle = {
        constants: {
            allRules: [],
            allMediaRules: [],
            allKeyframeRules: [],
            cssGS: 'html{scrollbar-color:unset}.dashboard-GS,pre.info-GS{top:0;z-index:9999;position:absolute}.dashboard-wrapper-GS,.dashboard-wrapper-GS *,.dashboard-wrapper-GS :after,.dashboard-wrapper-GS :before{box-sizing:border-box;margin:0;padding:0;font:12px/1.2 Arial,sans-serif}.dashboard-wrapper-GS{pointer-events:none}.dashboard-wrapper-GS strong{font-weight:700}.dashboard-GS,.info-GS,.selected-GS{pointer-events:all}.selected-GS{outline:green dashed thin}.dashboard-GS{box-shadow:rgba(0,0,0,.16) 0 3px 6px,rgba(0,0,0,.23) 0 3px 6px;right:5px;display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:8px;width:354px;padding:4px;border:thin solid silver;border-radius:4px;background-color:#fff;color:#282a36}.copy-option-GS{display:flex;align-content:center;flex-wrap:wrap;gap:4px;height:22px;padding:0 5px;border:2px solid #ffb86c;border-radius:4px;font-size:12px;line-height:22px;cursor:pointer;user-select:none}.check-GS{position:relative;width:13px;height:13px;border:thin solid;border-radius:2px}.check-GS.checked-GS::after{left:2px;top:-1px;width:4px;height:7px;border-width:0 1px 1px 0;border-style:solid;border-color:#00f;transform-origin:bottom left;transform:rotate(45deg)}.about-GS,.destroy-GS,.pause-GS,.unlock-GS{position:relative;display:block;cursor:pointer}.about-GS::after,.about-GS::before,.check-GS.checked-GS::after,.destroy-GS::after,.destroy-GS::before,.pause-GS::before,.unlock-GS::after,.unlock-GS::before{content:"";display:block;position:absolute}.destroy-GS::after,.destroy-GS::before{width:12px;height:2px;background:currentColor;transform:rotate(45deg);border-radius:5px;top:8px;left:3px}.destroy-GS::after{transform:rotate(-45deg)}.destroy-GS,.pause-GS{width:22px;height:22px;border:2px solid #ffb86c;border-radius:4px}.pause-GS::before{left:6px;top:6px;width:6px;height:6px;border-left:2px solid;border-right:2px solid}.pause-GS.play-GS::before{top:4px;left:7px;width:0;height:10px;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:6px solid;border-right:0}.unlock-GS{top:-6px;width:13px;height:9px;margin:0 3px;border:2px solid #ffb86c;border-top-right-radius:100px;border-top-left-radius:100px;border-bottom-color:transparent;border-right-color:transparent}.unlock-GS.lock-GS{border-top-right-radius:50%;border-top-left-radius:50%;border-right-color:#ffb86c}.unlock-GS::after{left:-5px;top:6px;width:20px;height:13px;border-radius:3px;border:2px solid #ffb86c}.unlock-GS::before{left:3px;top:10px;width:4px;height:6px;border-radius:2px;border:thin solid #fff;border-top:4px solid #000;background:currentColor}.about-GS{width:20px;height:20px;border:2px solid #ffb86c;border-radius:50%}.about-GS::after,.about-GS::before{border-radius:3px;width:2px;left:50%;background:currentColor;transform:translateX(-50%)}.about-GS::after{bottom:2px;height:8px}.about-GS::before{top:2px;height:2px}.about-info-GS{border:2px solid #ffb86c;border-radius:4px;flex-grow:1;padding:5px;color:#000;font-size:14px;line-height:1.2}pre.info-GS{left:0;width:auto;min-width:100px;max-width:400px;min-height:100px;max-height:90vh;padding:10px;border:thin solid silver;border-radius:4px;background-color:#282a36;color:#f1fa8c;font-size:13px;transition:transform .4s;overflow-y:auto;white-space:pre-wrap;word-break:break-word}pre.info-GS:empty{display:none}.info-GS.locked{border:thin solid #ffb86c;border-radius:2px;background-color:#383433;color:#0fb}.info-GS::before{content:"Copied!";position:absolute;top:22px;left:50%;display:none;font-size:24px;color:#ffb86c;transform:translateX(-50%)}.info-GS.copied::before{display:block;width:86px;animation:.6s 2 pulse-GS}.info-GS::-webkit-scrollbar-track{background-color:transparent;border-radius:6px}.info-GS::-webkit-scrollbar{width:6px;background-color:transparent}.info-GS::-webkit-scrollbar-thumb{border-radius:6px;background-color:#4d9c41}.info-selector-GS{color:#ff79c6}.info-delimiter-GS{color:#f8f8f2}.info-comment-GS{color:#6272a4}.info-rules-GS{color:#50fa7b}.hide-GS{display:none!important}@keyframes pulse-GS{from,to{transform:scale3d(1,1,1) translateX(-50%)}50%{transform:scale3d(1.09,1.09,1.09) translateX(-50%)}}',
            dashboard: null,
            dashboardId: 'dashboardWrapperGS',
            delay: 1600,
            error: null,
            hideClass: 'hide-GS',
            highlightClass: 'selected-GS',
            info: null,
            infoId: 'infoGS',
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
            dashboard.innerHTML = `<div class="dashboard-GS" id="dashboard-GS"><div class="about-GS" title="Toggle About section"></div><div class="copy-option-GS" title="Copy CSS of all children" data-value="needChildCss"><div class="check-GS"></div><span>Copy childs' CSS</span></div><div class="copy-option-GS" title="Copy inner HTML" data-value="needHtml"><div class="check-GS"></div><span>Copy HTML</span></div><div class="unlock-GS" title="Feeze tooltip on click"></div><div class="pause-GS" title="Pause"></div><div class="destroy-GS" title="Close"></div><div class="about-info-GS hide-GS"><strong>Gimme Style</strong> helps to check and copy an element's CSS styles. Hover the cursor on the element to see CSS, and click to copy.<br/><br/>Click the '<strong>lock</strong>' icon and a popup with CSS will be frozen after clicking on the element. The second click on the '<strong>lock</strong>' icon will unfreeze a popup.<br/><br/>In addition, you may copy the HTML code and CSS of element children on demand.</div>
</div>
<pre id="${infoId}" class="info-GS"></pre>`;
            const additionalStyles = document.createElement('style');
            additionalStyles.id = stylesId;
            additionalStyles.innerText = cssGS;

            document.body.appendChild(dashboard);
            document.body.appendChild(additionalStyles);
            this.constants.dashboard = document.getElementById('dashboard-GS');
            this.constants.info = document.getElementById(infoId);
        },

        togglePause: () => {
            const { pause } = self.settings;
            const { info, hideClass } = self.constants;
            const btn = document.querySelector('.pause-GS');

            self.settings.pause = !pause;
            btn.classList.toggle('play-GS');
            info.classList.toggle(hideClass);
            btn.title = pause ? 'Pause' : 'Play';
        },

        toggleLock() {
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
            document.querySelector('.about-info-GS').classList.toggle(self.constants.hideClass);
        },

        toggleFreeze() {
            this.settings.freeze = !this.settings.freeze;
            document.getElementById(this.constants.infoId).classList.toggle('locked');
        },

        placeDashboard() {
            const delta = 5;
            const { scrollY } = window;

            if (self.constants.dashboard) {
                self.constants.dashboard.style.transform = `translate(0, ${scrollY + delta}px)`;
            }
        },

        handleMouseOver(e) {
            const { pause, freeze } = self.settings;
            let { highlightClass } = self.constants;

            if (pause) {
                self.cleanHighlightClass();
            } else {
                e.preventDefault();

                const target = e.target;

                if (freeze || self.isDashboard(target)) {
                    return;
                }

                const { offsetWidth, offsetHeight } = target;

                self.constants.prevTarget?.classList.remove(highlightClass);
                self.constants.uniqStyles.clear();
                self.constants.uniqKeyFrames.clear();
                self.constants.result = '';
                self.constants.prevTarget = target;

                target.classList.add(highlightClass);

                let result = self.getElStyles(target);

                self.constants.result = result;
                result = result
                    .replace(/{/g, '<span class="info-delimiter-GS">{</span><span class="info-rules-GS">')
                    .replace(/\/\* Inline styles \*\//g, '  <span class="info-comment-GS">/*  Inline styles */</span>')
                    .replace(/}/g, '</span><span class="info-delimiter-GS">}</span>');
                result = `<span class="info-selector-GS">${self.getSelectorName(target)}${offsetHeight ? `    <span class="info-delimiter-GS">${offsetWidth}×${offsetHeight}px</span>` : ''}</span>
<span class="info-delimiter-GS">----------------</span>
${result}`;

                if (self.constants.error) {
                    result = `${result}
Error: ${self.constants.error}
If it happens with local files, please restart your browser with flag "--allow-file-access-from-files".
Otherwise, it may be CORS issue related to one of third-party CSS file, from a CDN for example. This case is not supported yet.`;
                }

                self.constants.info.innerHTML = result.trim(); // Show styles in popup
                self.movePopup(target); // Add new position to popup
            }
        },

        movePopup(el) { // TODO: popup adds horizontal scrollbar in some cases
            if (this.settings.pause) {
                return;
            }

            const delta = 10;
            const { width: infoWidth, height: infoHeight } = this.constants.info.getBoundingClientRect();
            const { width: elWidth, left: x, top: y } = el.getBoundingClientRect();
            const { scrollX, scrollY, innerWidth, innerHeight } = window;
            let infoX = x + scrollX + elWidth - delta;
            let infoY = y + scrollY + delta;

            if (infoX + infoWidth > innerWidth + scrollX) {
                infoX = x + scrollX - infoWidth + delta >= 0 ? x + scrollX - infoWidth + delta : x + scrollX;
            }

            if (infoY < scrollY) {
                infoY = scrollY + delta;
            } else if (infoY + infoHeight + delta >= scrollY + innerHeight) {
                infoY = scrollY + innerHeight - infoHeight - delta;
            }

            this.constants.info.style.transform = `translate(${infoX}px, ${infoY}px)`;
        },

        getElStyles(el) {
            const { allRules, allKeyframeRules, allMediaRules } = this.constants;
            const elRules = this.getSeparatedRules(el, allRules);
            const elMediaRules = this.getSeparatedRules(el, allMediaRules);
            const mediaResult = this.prepareStylesString(elMediaRules, '');
            const inlineStyles = this.prepareInlineStyles(el);
            let result = this.prepareStylesString(elRules, inlineStyles);
            const font = window.getComputedStyle(el, null).getPropertyValue('font');
            // Add font
            if (Boolean(font)) {
                result = `\n/* font: ${font} */\n\n${result}`;
            }

            const keyframeStyles = allKeyframeRules.reduce((res, rule) => {
                if (elRules.animationNames.includes(rule.name)) {
                    const css = rule.cssText;
                    if (this.constants.uniqKeyFrames.has(css)) {
                        return res;
                    }

                    this.constants.uniqKeyFrames.add(css);

                    return `${res}${rule.cssText}\n\n`;
                }

                return res;
            }, '');

            result = result === '' ? '' : `${result}${keyframeStyles}`;

            return result + mediaResult;
        },

        getStylesByRules(rules) {
            return rules.reduce((res, rule) => {
                const css = rule.cssText;
                const media = rule.media;

                if (this.constants.uniqStyles.has(css)) {
                    return res;
                }

                this.constants.uniqStyles.add(css);

                let separator = '\n    ';
                let postfix = '';

                if (res === '' || res.endsWith('}\n\n')) {
                    separator = '';
                }

                if (media) {
                    separator = `@media ${media} {\n    `;
                    postfix = '\n}\n\n';
                }

                const ruleAfter = media ? ';\n    }' : ';\n}\n\n';
                const nextLine = media ? ';\n      ' : ';\n  ';
                const firstLine = media ? '{\n      ' : '{\n  ';

                return `${res}${separator}${css
                    .replace(/\s+(--)*\w[-\w]*: ;/g, '') // remove rules without value
                    .replace(/(\s+0px)/g, ' 0') // margin: 0px; => margin: 0;
                    .replace(/({\s+)/g, firstLine) // next for start each rule from new line
                    .replace(/(;\s+)/g, nextLine)
                    .replace(/(;\s+})/g, ruleAfter)}${postfix}`;
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
            const target = e.currentTarget;
            const checkmark = target.children[0];
            const val = target.dataset.value;

            checkmark.classList.toggle('checked-GS');
            self.settings[val] = !self.settings[val];
        },

        copyStylesOfSelectedEl(e) {
            const { freeze, lock, needHtml, needChildCss, pause } = self.settings;

            if (pause) {
                return;
            }

            e.preventDefault();

            const target = e.target;
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
                setTimeout(() => { popup.classList.remove(copied); }, delay);
            });
        },

        handleEscapePress(e) {
            e.preventDefault();

            if (e.key === 'Escape' || e.key === 'Esc') {
                self.destroy();
            }
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

            if (el.className && typeof el.className === 'string' && el.className !== highlightClass) {
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

        async prepareAllRules() {
            let tmpRules = new Map();

            await Array.from(document.styleSheets).reduce(async(accPromise, s) => {
                const acc = await accPromise;

                try {
                    if (s.ownerNode.id !== self.constants.stylesId) {
                        const cssArr = self.getCssRulesFromSheet(s.cssRules);

                        self.mergeRulesWithSameSelector(cssArr, tmpRules);
                    }
                } catch (e) { // cross-domain stylesheets with restrictive CORS headers
                    const isUrlSecure = s.href.startsWith('https');
                    let settings = isUrlSecure ? { mode: 'cors', cache: 'no-store' } : { mode: 'no-cors', cache: 'no-store' };

                    try { // Workaround in case we can't read external css
                        const data = await self.fetchStylesheet(s.href, settings, e);

                        self.mergeRulesWithSameSelector(data, tmpRules);
                    } catch (_) {}
                }

                return acc;
            }, Promise.resolve([]));

            return [...tmpRules.values()];
        },

        mergeRulesWithSameSelector(rulesArray, tempRulesSet) {
            rulesArray.forEach((rule) => {
                const selectorText = rule.media ?
                    `${rule.selectorText}-${rule.media}` :
                    rule.selectorText || rule.name || rule.conditionText;

                if (!selectorText) { return; }

                let rules = tempRulesSet.get(selectorText);

                if (rules) { // Existed selector. Have to add new rules
                    // Get rules without selector
                    const newRules = rule.cssText
                        .replace(/.*\{([^}]+)}.*/, '$1')
                        .replace(/;+\s*/g, ';').trim()
                        .split(/(?<=;)/g); // split by empty string only after ';'
                    const oldRules = rules.cssText
                        .replace(/.*\{([^}]+)}.*/, '$1')
                        .replace(/;+\s*/g, ';').trim().split(/(?<=;)/g);
                    const selector = rules.cssText.replace(/\{([^}]+)}/, '{}');
                    // Get rid of repeated rules with the same value
                    let currentCssText = [...new Set([...oldRules, ...newRules])].join(' ');

                    // Add new rules for existed selector
                    currentCssText = selector.replace('{}', `{ ${currentCssText} }`);
                    tempRulesSet.set(selectorText, { ...rules, cssText: currentCssText });
                } else { // New selector
                    tempRulesSet.set(selectorText, rule);
                }
            });
        },

        async fetchStylesheet(url, settings, error) {
            try {
                const response = await fetch(url, settings);

                if (!response.ok) {
                    // In case site has http (not secure) connection we wouldn't fetch external css.
                    // Proxy can help with it, but need an additional service.
                    self.constants.error = error.message;
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                // we can't read external css directly, so we fetch it and add to style tag as a workaround
                const data = await response.text();
                const style = document.createElement('style');

                style.textContent = data;
                document.head.appendChild(style);

                return self.getCssRulesFromSheet(style.sheet.cssRules);
            } catch (e) {
                self.constants.error = e.message;
                throw new Error(e);
            }
        },

        getSeparatedRules(el, rules) {
            const { highlightClass } = this.constants;
            let activeRules = [], afterRules = [], animationNames = [], beforeRules = [], defaultRules = [], focusRules = [], hoverRules = [], visitedRules = [];

            function addAnimationName(name) {
                if (name) {
                    animationNames.push(name);
                }
            }

            rules.forEach((rule) => {
                if (rule.type === window.CSSRule.STYLE_RULE) {
                    const selectorText = rule.selectorText;
                    // in case selector starts with *::before or *::after
                    if (selectorText.startsWith('::before') || selectorText.startsWith('::after')) {
                        if (defaultRules.length > 1) {
                            defaultRules.splice(1, 0, rule);
                        } else {
                            defaultRules.push(rule);
                        }
                        return;
                    }

                    const tmpSelectorText = selectorText.replace(/ :/g, ' *:');
                    const name = rule.style.animationName;

                    try {
                        if (el.matches(selectorText)) {
                            if (selectorText !== `.${highlightClass}`) {
                                defaultRules.push(rule);
                                addAnimationName(name);
                            }
                        } else if (el.matches(tmpSelectorText.replace(/([^\\(])(:hover)\b/g, '$1'))) {
                            hoverRules.push(rule);
                            addAnimationName(name);
                        } else if (el.matches(tmpSelectorText.replace(/([^\\(])(:active)\b/g, '$1'))) {
                            activeRules.push(rule);
                            addAnimationName(name);
                        } else if (el.matches(tmpSelectorText.replace(/([^\\(])(:visited)\b/g, '$1'))) {
                            visitedRules.push(rule);
                            addAnimationName(name);
                        } else if (el.matches(tmpSelectorText
                            .replace(/([^\\(])(:focus-visible|:focus-within)\b/g, '$1')
                            .replace(/([^\\(])(:focus)\b/g, '$1'))) {
                            focusRules.push(rule);
                            addAnimationName(name);
                        } else if (el.matches(tmpSelectorText.replace(/::before\b/g, ''))) {
                            beforeRules.push(rule);
                            addAnimationName(name);
                        } else if (el.matches(tmpSelectorText.replace(/::after\b/g, ''))) {
                            afterRules.push(rule);
                            addAnimationName(name);
                        }
                    } catch (_) {
                        console.error(`Can't process selector ${selectorText}`);
                    }
                }
            });

            return { activeRules, afterRules, animationNames, beforeRules, defaultRules, focusRules, hoverRules, visitedRules };
        },

        prepareStylesString(rules, inlineStyles) {
            const { defaultRules, beforeRules, afterRules, hoverRules, activeRules, visitedRules, focusRules } = rules;
            let defaultStyles = this.getStylesByRules(defaultRules);

            // Add inline styles
            if (inlineStyles !== '') {
                defaultStyles = `${defaultStyles}${inlineStyles}`;
            }

            const result = [beforeRules, afterRules, hoverRules, activeRules, visitedRules, focusRules]
                .reduce((res, styles) => {
                    return Boolean(styles) ? `${res}${this.getStylesByRules(styles)}` : res;
                }, defaultStyles);

            return result;
        },

        getCssRulesFromSheet(rules) {
            return Array.from(rules).flat()
                .reduce((acc, rule) => {
                    let { selectorText, cssText, type, style, name, conditionText, cssRules = [] } = rule;

                    if (cssRules.length > 0) {
                        if (type === window.CSSRule.MEDIA_RULE) { // store media rules to additional array due to different structure
                            cssRules = Array.from(cssRules).map((r) => {
                                const { selectorText, cssText, type, style } = r;

                                return { selectorText, cssText, type, style, media: conditionText };
                            });

                            this.constants.allMediaRules.push({ conditionText, cssRules, cssText, type });

                            return acc;
                        } else if (rule.type === window.CSSRule.KEYFRAMES_RULE) { // store keyframe rules to additional array due to different structure
                            this.constants.allKeyframeRules.push({ cssText, name });

                            return acc;
                        }
                    }

                    acc.push({ selectorText, cssText, type, style, name, conditionText, cssRules });

                    return acc;
                }, []);
        },

        prepareInlineStyles(el) {
            let inlineStyles = (el.getAttribute('style') ?? '').trim();

            if (inlineStyles !== '') {
                inlineStyles = inlineStyles.replace(/:\s*/g, ': ').replace(/;?$/, ';').replace(/;\s*(?!$)/g, ';\n  ');
                inlineStyles = `/* Inline styles */\n${this.getSelectorName(el)} {\n  ${inlineStyles}\n}\n\n`;
            }

            return inlineStyles;
        },

        init() {
            self = this;

            this.addUI();

            if (self.constants.dashboard) {
                this.placeDashboard();
                this.prepareAllRules().then((result) => {
                    let tmpMediaRules = new Map();
                    const tmpMedia = this.constants.allMediaRules.map((m) => m.cssRules).flat();
                    // merge rules for the same selector in the same @media
                    this.mergeRulesWithSameSelector(tmpMedia, tmpMediaRules);
                    this.constants.allRules = result;
                    this.constants.allMediaRules = [...tmpMediaRules.values()];
                });

                document.querySelector('.destroy-GS')?.addEventListener('click', this.destroy);
                document.querySelector('.pause-GS')?.addEventListener('click', this.togglePause);
                document.querySelector('.unlock-GS')?.addEventListener('click', this.toggleLock);
                document.querySelector('.about-GS')?.addEventListener('click', this.toggleAbout);
                document.querySelectorAll('.copy-option-GS')?.forEach((el) => {
                    el.addEventListener('click', this.toggleCopyOption);
                });
                document.addEventListener('scroll', this.placeDashboard);
                document.addEventListener('mouseover', this.handleMouseOver);
                document.addEventListener('click', this.copyStylesOfSelectedEl);
                document.addEventListener('keydown', this.handleEscapePress);
            }
        },

        destroy() {
            const { dashboardId, stylesId } = self.constants;

            document.querySelector('.destroy-GS')?.removeEventListener('click', self.destroy);
            document.querySelector('.pause-GS')?.removeEventListener('click', self.togglePause);
            document.querySelector('.unlock-GS')?.removeEventListener('click', self.toggleLock);
            document.querySelector('.about-GS')?.removeEventListener('click', self.toggleAbout);
            document.querySelectorAll('.copy-option-GS')?.forEach((el) => {
                el.removeEventListener('click', self.toggleCopyOption);
            });
            document.removeEventListener('scroll', self.placeDashboard);
            document.removeEventListener('mouseover', self.handleMouseOver);
            document.removeEventListener('click', self.copyStylesOfSelectedEl);
            document.removeEventListener('keydown', self.handleEscapePress);

            self.cleanHighlightClass();
            document.getElementById(dashboardId)?.remove();
            document.getElementById(stylesId)?.remove();
            self = null;

            delete window.GimmeStyle;
        }
    };

    window.GimmeStyle.init();
} else {
    window.GimmeStyle.destroy();
}
