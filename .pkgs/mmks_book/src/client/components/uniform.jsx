import React from 'react';

import GraphQLBridge from 'uniforms/GraphQLBridge';

import {
         AutoForm,
         TextField,
         SelectField,
         LongTextField,
         SubmitField,
         NumField
       } from 'uniforms-bootstrap3';

const BookForm = class extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = () => {
//      let vals = this.refs.form.getValue(); // <- validate on every change
//      this.info( ' @ onChange ', JSON.stringify(vals) );
    };

    this.submitForm = (values) => {
      /* eslint-disable no-console */
      console.log('--------- Submit Action : props', props);
      console.log('--------- Submit Action : doc ', values);
      /* eslint-enable no-console */

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
    console.log('API_AST : ', API_AST);        // eslint-disable-line no-console
    this.schemaType = API_AST.getType('Book');

    this.schemaValidator = () => {
//      const details = [];

      console.log('Validator');        // eslint-disable-line no-console

      // if ( ! model.title) {
      //   details.push({name: 'title', message: '"title" is required!'});
      // }

      // if (details.length) {
      //     throw {details};
      // }

    };

    this.schemaData = {

      author: {
        initialValue: 'Bob',
        attrs: { 'data-cuke': 'author' },
        options: [
            {label: 'Abe', value: 1},
            {label: 'Bob', value: 2},
            {label: 'Cal', value: 3}
        ]
      },
      // content: {
      //   allowedValues: ['A', 'B', 'C', ]
      // },
      pages: {
        label: '# of pages',
        initialValue: 7,
        attrs: { 'data-cuke': 'pages' },
        allowedValues: [ 1, 2, 3, 4, 5, 6, 7, 8 ]

      },
      title: {
        attrs: { 'data-cuke': 'title' },
        initialValue: 'Demo Book',
      }

    };

    /* eslint-disable no-console */
    console.log('Book schema : ', this.schemaType);
    console.log('Schema validator : ', this.schemaValidator);
    console.log('Schema data : ', this.schemaData);
    /* eslint-enable no-console */
    this.bridge = new GraphQLBridge(
                           this.schemaType
                         , this.schemaValidator
                         , this.schemaData
    );


    console.log('The bridge : ', this.bridge);        // eslint-disable-line no-console

    // this.submitAction
    this.state = {model: undefined};

    this.onModel = this.onModel.bind(this);

  }


  onModel(model) {
    this.setState({model: JSON.stringify(model, null, 4)});
    console.log('Model is : ', model);        // eslint-disable-line no-console
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
                <TextField data-cuke="title" name="title" label="Title"
                           placeholder="The book's title."/>
              </div>
              <div className="col-md-6">
                <SelectField data-cuke="author" name="author" label="Author" />
              </div>
              <div className="col-md-2">
                <NumField data-cuke="pages" name="pages" />
              </div>
            </div>
            <div className="row-fluid">
              <LongTextField name="content" label="Content"
                data-cuke="content" placeholder="Brief synopsis" />
            </div>
            <SubmitField data-cuke="save-item"/>
          </AutoForm>

      </div>
    );

  }

};

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
