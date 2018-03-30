import * as React from 'react';
<<<<<<< HEAD:packages/app/src/app/components/Preview/index.js
import type { Sandbox, Module, Preferences } from 'common/types';
import { listen, dispatch, registerFrame } from 'codesandbox-api';
=======
import { listen, notifyListeners } from 'codesandbox-api';
>>>>>>> refactor components to TS:packages/app/src/app/components/Preview/index.tsx
import { debounce } from 'lodash';
import { frameUrl } from 'common/utils/url-generator';
import { getModulePath } from 'common/sandbox/modules';
import { generateFileFromSandbox } from 'common/templates/configuration/package-json';
import Navigator from './Navigator';
import { Container, StyledFrame } from './elements';
<<<<<<< HEAD

<<<<<<< HEAD:packages/app/src/app/components/Preview/index.js
=======
import {
  Module,
  Sandbox,
} from 'app/store/modules/editor/types'

import {
  Settings
} from 'app/store/modules/preferences/types'
=======
import { Module, Sandbox } from 'app/store/modules/editor/types';
import { Settings } from 'app/store/modules/preferences/types';
>>>>>>> more fixes

let frames = [];

function sendMessage(sandboxId: string, message: {}) {
    const rawMessage = JSON.parse(JSON.stringify(message));
    frames.forEach((frame) => {
        frame.postMessage({ ...rawMessage, codesandbox: true }, frameUrl(sandboxId));
    });
}

export function dispatch(sandboxId: string, message: {} = {}) {
    const finalMessage = {
        ...message,
        codesandbox: true
    };
    sendMessage(sandboxId, finalMessage);
    notifyListeners(finalMessage, window);
}

export function evaluateInSandbox(sandboxId: string, command: string) {
    dispatch(sandboxId, { type: 'evaluate', command });
}

>>>>>>> refactor components to TS:packages/app/src/app/components/Preview/index.tsx
type Props = {
    onInitialized?: (preview: BasePreview) => () => void; // eslint-disable-line no-use-before-define
    sandbox: Sandbox;
    extraModules?: { [path: string]: { code: string; path: string } };
    currentModule: Module;
    settings: Settings;
    initialPath?: string;
    isInProjectView: boolean;
    showDevtools?: boolean;
    onClearErrors?: () => void;
    onAction?: (action: {}) => void;
    onOpenNewWindow?: () => void;
    onToggleProjectView?: () => void;
    isResizing?: boolean;
    alignRight?: () => void;
    alignBottom?: () => void;
    onResize?: (height: number) => void;
    delay?: number;
    showNavigation?: boolean;
    inactive?: boolean;
    dragging?: boolean;
};

type State = {
    frameInitialized: boolean;
    history: string[];
    historyPosition: number;
    urlInAddressBar: string;
    url?: string;
};

class BasePreview extends React.Component<Props, State> {
    static defaultProps = {
        showNavigation: true,
        delay: true
    };

<<<<<<< HEAD
    // we need a value that doesn't change when receiving `initialPath`
    // from the query params, or the iframe will continue to be re-rendered
    // when the user navigates the iframe app, which shows the loading screen
    this.initialPath = props.initialPath;

    this.listener = listen(this.handleMessage);

    if (props.delay) {
      this.executeCode = debounce(this.executeCode, 800);
    }
  }
=======
    listener?: () => void;
    disposeInitializer?: () => void;
    initialPath: string;
    constructor(props: Props) {
        super(props);

        this.state = {
            frameInitialized: false,
            history: [],
            historyPosition: -1,
            urlInAddressBar: frameUrl(props.sandbox.id, props.initialPath || ''),
            url: null
        };
>>>>>>> more fixes

        // we need a value that doesn't change when receiving `initialPath`
        // from the query params, or the iframe will continue to be re-rendered
        // when the user navigates the iframe app, which shows the loading screen
        this.initialPath = props.initialPath;

        if (props.delay) {
            this.executeCode = debounce(this.executeCode, 800);
        }

        frames = [];
    }

<<<<<<< HEAD
  openNewWindow = () => {
    if (this.props.onOpenNewWindow) {
      this.props.onOpenNewWindow();
    }

    window.open(this.state.urlInAddressBar, '_blank');
  };

  handleSandboxChange = (newId: string) => {
    const url = frameUrl(newId, this.props.initialPath);
    this.setState(
      {
        history: [url],
        historyPosition: 0,
        urlInAddressBar: url,
      },
      () => this.handleRefresh()
    );
  };

  handleDependenciesChange = () => {
    this.handleRefresh();
  };

<<<<<<< HEAD:packages/app/src/app/components/Preview/index.js
  handleMessage = (data: Object, source: any) => {
    if (data && data.codesandbox) {
      if (data.type === 'initialized' && source) {
        registerFrame(source);
=======
  handleMessage = (data: any, source: any) => {
    if (source) {
      if (data.type === 'initialized') {
        if (frames.indexOf(source) === -1) {
          frames.push(source);
=======
    componentWillUnmount() {
        if (this.listener) {
            this.listener();
        }
        if (this.disposeInitializer) {
            this.disposeInitializer();
        }
    }

    componentDidMount() {
        this.listener = listen(this.handleMessage);
    }

    openNewWindow = () => {
        if (this.props.onOpenNewWindow) {
            this.props.onOpenNewWindow();
>>>>>>> more fixes
        }
>>>>>>> refactor components to TS:packages/app/src/app/components/Preview/index.tsx

        window.open(this.state.urlInAddressBar, '_blank');
    };

    handleSandboxChange = (newId: string) => {
        const url = frameUrl(newId, this.props.initialPath);
        this.setState(
            {
                history: [ url ],
                historyPosition: 0,
                urlInAddressBar: url
            },
            () => this.handleRefresh()
        );
    };

    handleDependenciesChange = () => {
        this.handleRefresh();
    };

    handleMessage = (data: any, source: any) => {
        if (source) {
            if (data.type === 'initialized') {
                if (frames.indexOf(source) === -1) {
                    frames.push(source);
                }

                if (!this.state.frameInitialized && this.props.onInitialized) {
                    this.disposeInitializer = this.props.onInitialized(this);
                }
                this.setState({
                    frameInitialized: true
                });
                this.executeCodeImmediately(true);
            } else {
                const { type } = data;

                switch (type) {
                    case 'render': {
                        this.executeCodeImmediately();
                        break;
                    }
                    case 'urlchange': {
                        this.commitUrl(data.url);
                        break;
                    }
                    case 'resize': {
                        if (this.props.onResize) {
                            this.props.onResize(data.height);
                        }
                        break;
                    }
                    case 'action': {
                        if (this.props.onAction) {
                            this.props.onAction({
                                ...data,
                                sandboxId: this.props.sandbox.id
                            });
                        }

                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        }
    };

    executeCode = () => {
        requestAnimationFrame(() => {
            this.executeCodeImmediately();
        });
    };

    getRenderedModule = () => {
        const { sandbox, currentModule, isInProjectView } = this.props;

        return isInProjectView
            ? '/' + sandbox.entry
            : getModulePath(sandbox.modules, sandbox.directories, currentModule.id);
    };

    executeCodeImmediately = (initialRender: boolean = false) => {
        const settings = this.props.settings;
        const sandbox = this.props.sandbox;

        if (settings.clearConsoleEnabled) {
            // tslint:disable-next-line
            console.clear();
            dispatch(sandbox.id, { type: 'clear-console' });
        }

        // Do it here so we can see the dependency fetching screen if needed
        this.clearErrors();
        if (settings.forceRefresh && !initialRender) {
            this.handleRefresh();
        } else {
            if (!this.props.isInProjectView) {
                evaluateInSandbox(this.props.sandbox.id, `history.pushState({}, null, '/')`);
            }

<<<<<<< HEAD
    if (settings.clearConsoleEnabled) {
      console.clear(); // eslint-disable-line no-console
      dispatch({ type: 'clear-console' });
    }

    // Do it here so we can see the dependency fetching screen if needed
    this.clearErrors();
    if (settings.forceRefresh && !initialRender) {
      this.handleRefresh();
    } else {
      if (!this.props.isInProjectView) {
        dispatch({
          type: 'evaluate',
          command: `history.pushState({}, null, '/')`,
        });
      }
=======
            const modulesObject = {};

            sandbox.modules.forEach((m) => {
                const path = getModulePath(sandbox.modules, sandbox.directories, m.id);
                modulesObject[path] = {
                    path,
                    code: m.code
                };
            });
>>>>>>> more fixes

            const extraModules = this.props.extraModules || {};
            const modulesToSend = { ...extraModules, ...modulesObject };

<<<<<<< HEAD
      sandbox.modules.forEach(m => {
        const path = getModulePath(sandbox.modules, sandbox.directories, m.id);
        if (path) {
          modulesObject[path] = {
            path,
            code: m.code,
          };
        }
      });
=======
            if (!modulesToSend['/package.json']) {
                modulesToSend['/package.json'] = {
                    code: generateFileFromSandbox(sandbox),
                    path: '/package.json'
                };
            }
>>>>>>> more fixes

            sendMessage(sandbox.id, {
                type: 'compile',
                version: 3,
                entry: this.getRenderedModule(),
                modules: modulesToSend,
                sandboxId: sandbox.id,
                externalResources: sandbox.externalResources,
                isModuleView: !this.props.isInProjectView,
                template: sandbox.template,
                hasActions: !!this.props.onAction
            });
        }
    };

<<<<<<< HEAD
      if (!modulesToSend['/package.json']) {
        modulesToSend['/package.json'] = {
          code: generateFileFromSandbox(sandbox),
          path: '/package.json',
        };
      }

      dispatch({
        type: 'compile',
        version: 3,
        entry: this.getRenderedModule(),
        modules: modulesToSend,
        sandboxId: sandbox.id,
        externalResources: sandbox.externalResources,
        isModuleView: !this.props.isInProjectView,
        template: sandbox.template,
        hasActions: !!this.props.onAction,
      });
    }
  };
=======
    clearErrors = () => {
        if (this.props.onClearErrors) {
            this.props.onClearErrors();
        }
    };
>>>>>>> more fixes

    updateUrl = (url: string) => {
        this.setState({ urlInAddressBar: url });
    };

    sendUrl = () => {
        const { urlInAddressBar } = this.state;

        (document.getElementById('sandbox') as HTMLIFrameElement).src = urlInAddressBar;

        this.setState({
            history: [ urlInAddressBar ],
            historyPosition: 0,
            urlInAddressBar
        });
    };

    handleRefresh = () => {
        const { history, historyPosition } = this.state;
        const url = history[historyPosition];

        (document.getElementById('sandbox') as HTMLIFrameElement).src = url;

        this.setState({
            history: [ url ],
            historyPosition: 0,
            urlInAddressBar: url
        });
    };

    handleBack = () => {
        sendMessage(this.props.sandbox.id, {
            type: 'urlback'
        });

<<<<<<< HEAD
  handleBack = () => {
    dispatch({
      type: 'urlback',
    });
=======
        const { historyPosition, history } = this.state;
        this.setState({
            historyPosition: this.state.historyPosition - 1,
            urlInAddressBar: history[historyPosition - 1]
        });
    };
>>>>>>> more fixes

    handleForward = () => {
        sendMessage(this.props.sandbox.id, {
            type: 'urlforward'
        });

<<<<<<< HEAD
  handleForward = () => {
    dispatch({
      type: 'urlforward',
    });
=======
        const { historyPosition, history } = this.state;
        this.setState({
            historyPosition: this.state.historyPosition + 1,
            urlInAddressBar: history[historyPosition + 1]
        });
    };
>>>>>>> more fixes

    commitUrl = (url: string) => {
        const { history, historyPosition } = this.state;

        const currentHistory = history[historyPosition] || '';
        if (currentHistory !== url) {
            history.length = historyPosition + 1;
            this.setState({
                history: [ ...history, url ],
                historyPosition: historyPosition + 1,
                urlInAddressBar: url
            });
        }
    };

    toggleProjectView = () => {
        if (this.props.onToggleProjectView) {
            this.props.onToggleProjectView();
        }
    };

    render() {
        const { showNavigation, inactive, sandbox, settings, isInProjectView, dragging } = this.props;
        const { historyPosition, history, urlInAddressBar } = this.state;
        const url = urlInAddressBar || frameUrl(sandbox.id);

        return (
            <Container style={{ flex: 1 }}>
                {showNavigation && (
                    <Navigator
                        url={decodeURIComponent(url)}
                        onChange={this.updateUrl}
                        onConfirm={this.sendUrl}
                        onBack={historyPosition > 0 ? this.handleBack : null}
                        onForward={historyPosition < history.length - 1 ? this.handleForward : null}
                        onRefresh={this.handleRefresh}
                        isProjectView={isInProjectView}
                        toggleProjectView={this.props.onToggleProjectView && this.toggleProjectView}
                        openNewWindow={this.openNewWindow}
                        zenMode={settings.zenMode}
                        alignRight={this.props.alignRight}
                        alignBottom={this.props.alignBottom}
                    />
                )}

                <StyledFrame
                    sandbox="allow-forms allow-scripts allow-same-origin allow-modals allow-popups allow-presentation"
                    src={frameUrl(sandbox.id, this.initialPath)}
                    id="sandbox"
                    title={sandbox.id}
                    style={{
                        pointerEvents: dragging || inactive || this.props.isResizing ? 'none' : 'initial'
                    }}
                />
            </Container>
        );
    }
}

export default BasePreview;
