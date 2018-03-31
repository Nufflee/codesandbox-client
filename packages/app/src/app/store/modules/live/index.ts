import { Module, Computed } from '@cerebral/fluent';
import * as computed from './computed';
import * as sequences from './sequences';

import { State } from './types';

const state: State = {
    isLive: false,
    isLoading: false,
    error: null,
    roomInfo: null,
    isOwner: false,
    receivingCode: false,
    reconnecting: false,
    isEditor: Computed(computed.isEditor),
    isCurrentEditor: Computed(computed.isCurrentEditor),
    liveUsersByModule: Computed(computed.liveUsersByModule)
};

const signals = {
    roomJoined: sequences.initializeLive,
    createLiveClicked: sequences.createLive,
    liveMessageReceived: sequences.handleMessage,
    onTransformMade: sequences.sendTransform,
    applyTransformation: sequences.applyTransformation,
    onCodeReceived: sequences.unSetReceivingStatus,
    onOperationApplied: sequences.clearPendingOperation,
    onSelectionChanged: sequences.sendSelection,
    onSelectionDecorationsApplied: sequences.clearPendingUserSelections,
    onModeChanged: sequences.changeMode,
    onAddEditorClicked: sequences.addEditor,
    onRemoveEditorClicked: sequences.removeEditor
};

export default Module<State, typeof signals>({
    state,
    signals
});
