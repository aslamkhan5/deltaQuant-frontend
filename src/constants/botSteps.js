import EntryStep from "../components/Stepper/EntryStep";
import ExitStep from "../components/Stepper/ExitStep";
import OverviewStep from "../components/Stepper/OverviewStep";

const stepsSchema = [
    {
      label: "Overview",
      fields: [
        { name: "botName", placeholder: "Bot Name", type: "text" },
        { name: "strategy", placeholder: "Strategy", type: "text" },
        { name: "parameters", placeholder: "Parameter", type: "text" }
      ],
      validate: (values) => {
        let errors = {};
        if (!values.botName) errors.botName = 'Bot name is required';
        if (!values.strategy) errors.strategy = 'Strategy name is required';
        if (!values.parameters) errors.parameters = 'Parameter is required';
        return errors;
      },
      content: (formValues, handleChange, errors) => (
        <OverviewStep
          botName={formValues.botName}
          strategy={formValues.strategy}
          parameters={formValues.parameters}
          handleChange={handleChange}
          errors={errors}
        />
      )
    },
    {
      label: "Entry",
      fields: [
        { name: "entry", placeholder: "Entry", type: "text" }
      ],
      validate: (values) => {
        let errors = {};
        if (!values.entry) errors.entry = 'Entry name is required';
        return errors;
      },
      content: (formValues, handleChange, errors) => (
        <EntryStep
          entry={formValues.entry}
          handleChange={handleChange}
          errors={errors}
        />
      )
    },
    {
      label: "Exit",
      fields: [
        { name: "exit", placeholder: "Exit", type: "text" }
      ],
      validate: (values) => {
        let errors = {};
        if (!values.exit) errors.exit = 'Exit is required';
        return errors;
      },
      content: (formValues, handleChange, errors) => (
        <ExitStep
          exit={formValues.exit}
          handleChange={handleChange}
          errors={errors}
        />
      )
    }
  ];
  export default stepsSchema