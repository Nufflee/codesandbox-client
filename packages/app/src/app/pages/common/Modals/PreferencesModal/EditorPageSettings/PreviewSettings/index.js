import React from 'react';

import {
  Title,
  SubContainer,
  PreferenceContainer,
  PaddedPreference,
  SubDescription,
  Rule,
} from '../../elements';

function PreviewSettings({ store, signals }) {
  const bindValue = name => ({
    value: store.preferences.settings[name],
    setValue: value =>
      signals.preferences.settingChanged({
        name,
        value,
      }),
  });

  const relativeUrlPrefix = store.preferences.settings.relativeUrlPrefix || '/';

  return (
    <div>
      <Title>Preview</Title>

      <SubContainer>
        <PreferenceContainer>
          <PaddedPreference
            title="Preview on edit"
            type="boolean"
            {...bindValue('livePreviewEnabled')}
            tooltip="Only update on save"
          />
          <SubDescription>
            Preview the latest code without saving.
          </SubDescription>
          <Rule />
          <PaddedPreference
            title="Clear console"
            type="boolean"
            {...bindValue('clearConsoleEnabled')}
            tooltip="Clear console when executing"
          />
          <SubDescription>
            Clear your developer console between every execution.
          </SubDescription>
          <Rule />
          <PaddedPreference
            title="Instant preview"
            type="boolean"
            {...bindValue('instantPreviewEnabled')}
          />
          <SubDescription>Show preview on every keypress.</SubDescription>
          <Rule />
          <PaddedPreference
            title="Relative preview URLs"
            type="boolean"
            {...bindValue('relativeUrlsEnabled')}
          />
          <SubDescription>
            Use relative (shortened) preview URLs.
          </SubDescription>
          {store.preferences.settings.relativeUrlsEnabled && (
            <React.Fragment>
              <Rule />
              <PaddedPreference
                title="Relative URL prefix"
                type="string"
                placeholder="/"
                {...bindValue('relativeUrlPrefix')}
              />
              <SubDescription>
                The relative (shortened) URL prefix to be used. The prefix
                &apos;{relativeUrlPrefix}&apos; will redirect &apos;{relativeUrlPrefix.endsWith(
                  '/'
                )
                  ? relativeUrlPrefix.slice(0, -1)
                  : relativeUrlPrefix}/somePath&apos; to &apos;https://{
                  store.editor.currentSandbox.id
                }.codesandbox.io/somePath&apos;
              </SubDescription>
            </React.Fragment>
          )}
        </PreferenceContainer>
      </SubContainer>
    </div>
  );
}

export default inject('store', 'signals')(observer(PreviewSettings));
