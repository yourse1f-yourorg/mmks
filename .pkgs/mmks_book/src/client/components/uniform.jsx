import React from 'react';

import t from 'tcomb-form';

import {buildASTSchema, parse} from 'graphql';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';

import GraphQLBridge    from 'uniforms/GraphQLBridge';

import {
         AutoForm,
         ValidatedQuickForm,
         TextField,
         SelectField,
         LongTextField,
         SubmitField,
         ErrorsField,
         NumField
       } from 'uniforms-bootstrap3';

// import AutoForm from 'uniforms/AutoForm'; // Or from the theme package.
// import BaseField from 'uniforms/BaseField';

// const
//                                                 = bootstrap3;

const BookForm = class extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = () => {
//      let vals = this.refs.form.getValue(); // <- validate on every change
//      this.info( ' @ onChange ', JSON.stringify(vals) );
    };

    // this.submitForm = this.submitForm.bind(this);
    this.submitForm = (values) => {
      console.log("--------- Submit Action : props", props);
      console.log("--------- Submit Action : doc ", values);
//       event.preventDefault();
//       var values = this.refs.form.getValue();
// //      this.debug('submitForm', JSON.stringify(doc));
      if (values) {
        this.props.clearErrors();
        if (this.props._id) {
          this.props.submitAction(values, this.props._id, this.props.mutate);
        } else {
          this.props.submitAction(values, this.props.mutate);
        }
      }
    };

    const { API_AST } = this.props.context();
    console.log("API_AST : ", API_AST);
    this.schemaType = API_AST.getType('Book');

    this.schemaValidator = model => {
      const details = [];

      console.log("Validator");

      // if ( ! model.title) {
      //   details.push({name: 'title', message: '"title" is required!'});
      // }

      // if (details.length) {
      //     throw {details};
      // }

    };

    this.schemaData = {

      author: {
        initialValue: "Bob",
        options: [
            {label: "Abe", value: 1},
            {label: "Bob", value: 2},
            {label: "Cal", value: 3}
        ]
      },
      // content: {
      //   allowedValues: ["A", "B", "C", ]
      // },
      pages: {
        label : "# of pages",
        initialValue : 7,
        allowedValues: [1, 2, 3, 4, 5, 6, 7, 8]

      },
      title: {
        initialValue : "Fuck You",
      }

    };

    console.log("Book schema : ", this.schemaType);
    console.log("Schema validator : ", this.schemaValidator);
    console.log("Schema data : ", this.schemaData);
    this.bridge = new GraphQLBridge(
                           this.schemaType
                         , this.schemaValidator
                         , this.schemaData
    );


    console.log("The bridge : ", this.bridge);

    // this.submitAction
    this.state = {model: undefined};

    this.onModel = this.onModel.bind(this);

  }


  onModel (model) {
      this.setState({model: JSON.stringify(model, null, 4)});
      console.log("Model is : ", model);
  }

  render() {

    return (
      <div>

          <AutoForm
               schema={this.bridge}
               onSubmit={doc => this.submitForm(doc)}
          >
            <div className="row-fluid">
              <div className="col-md-4">
                <TextField name="title" label="Title" placeholder="The title of the book"/>
              </div>
              <div className="col-md-6">
                <SelectField name="author"  label="Author" />
              </div>
              <div className="col-md-2">
                <NumField name="pages" />
              </div>
            </div>
            <div className="row-fluid">
              <LongTextField name="content" label="Content"
                               disabled={false} placeholder="Brief synopsis" />
            </div>
            <SubmitField />
          </AutoForm>

      </div>
    );

  }

}

// const bookMutation = gql`
//   mutation createBook( $title: String! $content: String! $pages: Int! $authorId: Int! )
//   {
//     createBook( title: $title, content: $content, pages: $pages authorId: $authorId )
//     {
//       _id title content pages
//     }
//   }`;

// export default graphql(bookMutation)(BookForm);
export default BookForm;
