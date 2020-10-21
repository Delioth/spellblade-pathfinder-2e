import React, { FC } from 'react';
import postForm from '../util/postForm';
import { Formik, Form, Field, useFormikContext, FieldArray } from 'formik';
import Element, { MinimalElement } from '../components/ElementDisplay';
import { HeaderType } from '../util/getTitle';
import { InputTypes } from '../util/InputTypes';
import { Box, Card, Grid } from 'theme-ui';

const TraitInputs: FC<{ name: string }> = ({ name }) => {
  const { values } = useFormikContext();

  return (
    <FieldArray name={name}>
      {({ remove, insert, push }) => (
        <div>
          {values[name] && values[name].length > 0 ? (
            values[name].map((value, i) => {
              return (
                <div key={i}>
                  <Field type="text" name={`${name}.${i}`} value={value} />
                  <button type="button" onClick={() => remove(i)}>
                    -
                  </button>
                  <button type="button" onClick={() => insert(i, '')}>
                    +
                  </button>
                  <br />
                </div>
              );
            })
          ) : (
            <button type="button" onClick={() => push('')}>
              Add Trait
            </button>
          )}
        </div>
      )}
    </FieldArray>
  );
};

const AllFields: FC<Typed> = ({ kind }) => {
  return (
    <>
      {kind ? null : (
        <div>
          <label>Type: </label>
          <Field as="select" name="type">
            {Object.keys(InputTypes).map((key) => (
              <option key={key} value={InputTypes[key as string]}>
                {key}
              </option>
            ))}
          </Field>
        </div>
      )}
      <div>
        <label>Title: </label>
        <Field type="text" name="title" />
      </div>
      <div>
        <label>Source: </label>
        <Field type="text" name="source" />
      </div>
      <div>
        <label>Version: </label>
        <Field type="text" name="version" />
      </div>
    </>
  );
};

const FeatFields: FC = () => {
  return (
    <>
      <div>
        <label htmlFor="traits">Traits: </label>
        <br />
        <TraitInputs name="traits" />
      </div>
      <div>
        <label htmlFor="actions">Actions: </label>
        <Field as="select" name="actions">
          <option value="none">None</option>
          <option value="free">Free Action</option>
          <option value="reaction">Reaction</option>
          <option value="one">One Action</option>
          <option value="two">Two Actions</option>
          <option value="three">Three Actions</option>
        </Field>
      </div>
      <div>
        <label htmlFor="frequency">Frequency: </label>
        <Field type="text" name="frequency" />
      </div>
      <div>
        <label htmlFor="requirements">Requirements: </label>
        <Field type="text" name="requirements" />
      </div>
      <div>
        <label htmlFor="prerequisites">Prerequisites: </label>
        <Field type="text" name="prerequisites" />
      </div>
      <div>
        <label htmlFor="trigger">Trigger: </label>
        <Field type="text" name="trigger" />
      </div>
      <div>
        <label htmlFor="level">Level: </label>
        <Field type="number" min={1} max={20} step={1} name="level" />
      </div>
      <div>
        <label htmlFor="feature">Feature? </label>
        <Field type="checkbox" name="feature" id="feature" />
      </div>
      <div>
        <label htmlFor="markdown">Markdown Content: </label>
        <Field as="textarea" name="markdown" cols={50} rows={5} />
      </div>
    </>
  );
};

const SpellFields: FC = () => {
  return (
    <>
      <div>
        <label htmlFor="traits">Traits: </label>
        <br />
        <TraitInputs name="traits" />
      </div>
      <div>
        <label htmlFor="requirements">Requirements: </label>
        <Field type="text" name="requirements" />
      </div>
      <div>
        <label htmlFor="prerequisites">Prerequisites: </label>
        <Field type="text" name="prerequisites" />
      </div>
      <div>
        <label htmlFor="trigger">Trigger: </label>
        <Field type="text" name="trigger" />
      </div>
      <div>
        <label htmlFor="level">Level: </label>
        <Field type="number" min={1} max={10} step={1} name="level" />
      </div>
      <div>
        <label htmlFor="cast_time">Cast Time: </label>
        <Field as="select" name="cast_time">
          <option value="none">None</option>
          <option value="free">Free Action</option>
          <option value="reaction">Reaction</option>
          <option value="one">One Action</option>
          <option value="two">Two Actions</option>
          <option value="three">Three Actions</option>
        </Field>
      </div>
      <div>
        <label htmlFor="components">Components: </label>
        <Field as="select" name="components" id="components" multiple>
          <option value="verbal">Verbal</option>
          <option value="somatic">Somatic</option>
          <option value="material">Material</option>
          <option value="focus">Focus</option>
        </Field>
      </div>
      <div>
        <label htmlFor="area_shape">Area: </label>
        <Field as="select" name="area_shape" id="area_shape">
          <option value=""></option>
          <option value="cone">cone</option>
          <option value="burst">burst</option>
          <option value="emanation">emanation</option>
          <option value="line">line</option>
        </Field>
        <Field name="area_size" type="number" min={5} max={200} step={5} />
      </div>
      <div>
        <label htmlFor="target">Targets:</label>
        <Field name="target" id="target" type="text" />
      </div>
      <div>
        <label htmlFor="duration">Duration:</label>
        <Field type="text" name="duration" id="duration" />
      </div>
      <div>
        <label htmlFor="save">Save:</label>
        <Field as="select" name="save" id="save">
          <option value=""></option>
          <option value="fortitude">Fortitude</option>
          <option value="reflex">Reflex</option>
          <option value="will">Will</option>
        </Field>
      </div>
      <div>
        <label htmlFor="focus">Focus? </label>
        <Field type="checkbox" name="focus" id="focus" />
      </div>
      <div>
        <label htmlFor="markdown">Markdown Content: </label>
        <Field as="textarea" name="markdown" cols={50} rows={5} />
      </div>
    </>
  );
};
const DisciplineFields: FC = () => {
  return (
    <>
      <div>
        <label htmlFor="traits">Traits Available: </label>
        <br />
        <TraitInputs name="traits" />
      </div>
      <div>
        <label htmlFor="ability">Spellcasting Ability: </label>
        <Field as="select" name="ability" id="ability">
          <option value="intelligence">Intelligence</option>
          <option value="wisdom">Wisdom</option>
          <option value="charisma">Charisma</option>
        </Field>
      </div>
      <div>
        <label htmlFor="tradition">Spellcasting Tradition: </label>
        <Field as="select" name="tradition" id="tradition">
          <option value="arcane">Arcane</option>
          <option value="divine">Divine</option>
          <option value="occult">Occult</option>
          <option value="primal">Primal</option>
        </Field>
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <Field
          as="textarea"
          name="description"
          id="description"
          cols={50}
          rows={5}
        />
      </div>
      <div>
        <label htmlFor="exit_name">Exit Action: </label>
        <Field name="exit_name" />
      </div>
      <div>
        <label htmlFor="exit">Exit Description: </label>
        <Field as="textarea" name="exit" cols={50} rows={3} />
      </div>
      <div>
        <label htmlFor="exit_time">Exit Action Time: </label>
        <Field as="select" name="exit_time">
          <option value="none">None</option>
          <option value="free">Free Action</option>
          <option value="reaction">Reaction</option>
          <option value="one">One Action</option>
          <option value="two">Two Actions</option>
          <option value="three">Three Actions</option>
        </Field>
      </div>
      <div>
        <label htmlFor="exit_traits">Exit Action Traits: </label>
        <br />
        <TraitInputs name="exit_traits" />
      </div>
    </>
  );
};
const StanceFields: FC = () => {
  return (
    <>
      <div>
        <label htmlFor="traits">Traits: </label>
        <br />
        <TraitInputs name="traits" />
      </div>
      <div>
        <label htmlFor="requirements">Requirements: </label>
        <Field type="text" name="requirements" />
      </div>
      <div>
        <label htmlFor="prerequisites">Prerequisites: </label>
        <Field type="text" name="prerequisites" />
      </div>
      <div>
        <label htmlFor="trigger">Trigger: </label>
        <Field type="text" name="trigger" />
      </div>
      <div>
        <label htmlFor="level">Level: </label>
        <Field type="number" min={1} max={10} step={1} name="level" />
      </div>
      <div>
        <label htmlFor="cast_time">Cast Time: </label>
        <Field as="select" name="cast_time">
          <option value="none">None</option>
          <option value="free">Free Action</option>
          <option value="reaction">Reaction</option>
          <option value="one">One Action</option>
          <option value="two">Two Actions</option>
          <option value="three">Three Actions</option>
        </Field>
      </div>
      <div>
        <label htmlFor="components">Components: </label>
        <Field as="select" name="components" id="components" multiple>
          <option value="verbal">Verbal</option>
          <option value="somatic">Somatic</option>
          <option value="material">Material</option>
          <option value="focus">Focus</option>
        </Field>
      </div>
      <div>
        <label htmlFor="focus">Focus? </label>
        <Field type="checkbox" name="focus" id="focus" />
      </div>
      <div>
        <label htmlFor="passive">Passive Benefit: </label>
        <Field as="textarea" name="passive" />
      </div>
      <div>
        <label htmlFor="active">Active Benefit: </label>
        <Field as="textarea" name="active" />
      </div>
      <div>
        <label htmlFor="exit">Exit Action: </label>
        <Field as="textarea" name="exit" />
      </div>
      <div>
        <label htmlFor="exit_time">Exit Action Time: </label>
        <Field as="select" name="exit_time">
          <option value="none">None</option>
          <option value="free">Free Action</option>
          <option value="reaction">Reaction</option>
          <option value="one">One Action</option>
          <option value="two">Two Actions</option>
          <option value="three">Three Actions</option>
        </Field>
      </div>
      <div>
        <label htmlFor="exit_traits">Exit Action Traits: </label>
        <br />
        <TraitInputs name="exit_traits" />
      </div>
    </>
  );
};
const TextFields: FC = () => {
  return (
    <>
      <div>
        <label htmlFor="titletype">Title Type: </label>
        <Field as="select" name="titletype">
          {Object.keys(HeaderType).map((key) => (
            <option key={key} value={HeaderType[key as string]}>
              {key}
            </option>
          ))}
        </Field>
      </div>
      <div>
        <label htmlFor="feature">Feature? </label>
        <Field type="checkbox" name="feature" id="feature" />
      </div>
      <div>
        <label htmlFor="level">Level: </label>
        <Field type="number" min={1} max={20} step={1} name="level" />
      </div>
      <div>
        <label htmlFor="markdown">Markdown: </label>
        <Field as="textarea" name="markdown" cols={50} rows={5} />
      </div>
    </>
  );
};
const SidebarFields: FC = () => {
  return <Field as="textarea" name="markdown" cols={50} rows={5} />;
};
const NoteFields: FC = () => {
  return <Field as="textarea" name="markdown" cols={50} rows={5} />;
};

type InitialValues = {
  type: InputTypes;
  source: string;
  context: string;
};
const initialValues: InitialValues = {
  type: InputTypes.FEAT,
  source: 'Delioth Homebrew',
  context: 'spellblade',
};

const RealForm: FC<Typed> = ({ kind }) => {
  const {
    resetForm,
    values: { type, source },
  } = useFormikContext<InitialValues>();
  const usedType = kind ?? type;

  return (
    <>
      <h1>Input [{usedType}] Data</h1>
      <Form>
        <AllFields kind={kind} />
        {usedType === InputTypes.FEAT && <FeatFields />}
        {usedType === InputTypes.SPELL && <SpellFields />}
        {usedType === InputTypes.STANCE_SPELL && <StanceFields />}
        {usedType === InputTypes.TEXTBLOCK && <TextFields />}
        {usedType === InputTypes.SIDEBAR && <SidebarFields />}
        {usedType === InputTypes.NOTE && <NoteFields />}
        {usedType === InputTypes.DISCIPLINE && <DisciplineFields />}
        <div>
          <button type="submit">Submit</button>
        </div>
        <div>
          <button
            type="button"
            onClick={() =>
              resetForm({ values: { ...initialValues, type, source } })
            }
          >
            Reset
          </button>
        </div>
      </Form>
    </>
  );
};

const ShowElement = () => {
  const { values } = useFormikContext();

  return (
    <Card sx={{ width: 'fit-content', maxWidth: 'page' }}>
      <Element {...(values as MinimalElement)} />
    </Card>
  );
};

type Typed = { kind?: InputTypes };
const Outer: FC<Typed & { data: any }> = ({ kind, data = {} }) => (
  <div>
    <Formik
      initialValues={{
        type: kind || InputTypes.FEAT,
        source: 'Delioth Homebrew',
        context: 'spellblade',
        ...data,
      }}
      onSubmit={postForm('/api/push')}
    >
      <Grid gap={2} columns={[1, 2, 2]} m={3}>
        <Box>
          <RealForm kind={kind} />
        </Box>
        <Box>
          <ShowElement />
        </Box>
      </Grid>
    </Formik>
    <br />
    <button onClick={() => fetch('/api/get')}>Do a fetch!</button>
    <button onClick={() => fetch('/api/canonize')}>Run Canonize</button>
  </div>
);

export default Outer;
