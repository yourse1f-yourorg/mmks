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

const nameModule = 'Book';

const ValidationException = (aryErrors) => {
  this.message = 'Form has errors';
  this.name = nameModule + ' -- ValidationException';
  this.errors = aryErrors;
};


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
    this.schemaType = API_AST.getType(nameModule);
    this.model = this.props.record || { author: {} };
    this.schemaData = this.props.schemaData || { };

    this.schemaValidator = (model) => {
      const details = [];

      console.log('Validator :: Model = ', model);        // eslint-disable-line no-console

      if ( model.pages < 1 ) {
        details.push({name: 'pages', message: '"pages" cannot be less than 1!'});
      }

      if (details.length) {
        throw ValidationException(details);
      }

    };

    /* eslint-disable no-console */
    console.log('Book model record : ', this.props.record);
    console.log('Book schema : ', this.schemaType);
    console.log('Schema validator : ', this.schemaValidator);
    console.log('Schema author options : ', this.props.authorOptions);
    this.schemaData.author = {
      options: this.props.authorOptions,
      value: this.model.author._id,
    };

    console.log('Schema data : ', this.schemaData);
    /* eslint-enable no-console */
    this.bridge = new GraphQLBridge(
                           this.schemaType
                         , this.schemaValidator
                         , this.schemaData
    );


    console.log('The bridge : ', this.bridge);        // eslint-disable-line no-console

    this.state = {model: this.model};

    this.onModel = this.onModel.bind(this);

  }


  onModel(model) {
    this.setState({model: JSON.stringify(model, null, 4)});
    console.log('Our model is now : ', model);        // eslint-disable-line no-console
  }

  render() {

    console.log('Rendering model : ', this.model);        // eslint-disable-line no-console

    const title = this.props._id ? 'Edit: ' + this.model.title : 'Add a book :';

    return (
      <div>
          <h3>{title}</h3>
          <AutoForm
               schema={this.bridge}
               onSubmit={doc => this.submitForm(doc)}
               model={this.model}
          >
            <div className="row-fluid">
              <div data-cuke="title" className="col-md-4">
                <TextField data-cuke="title" name="title" label="Title"
                           placeholder="The book's title."/>
              </div>
              <div data-cuke="author" className="col-md-6">
                <SelectField name="author" label="Author" />
              </div>
              <div data-cuke="pages" className="col-md-2">
                <NumField name="pages" label="# of pages"/>
              </div>
            </div>
            <div data-cuke="content" className="row-fluid">
              <LongTextField name="content" label="Content"
                placeholder="Brief synopsis" />
            </div>

            <SubmitField data-cuke="save-item"/>

          </AutoForm>
      </div>
    );
  }
};

/*
    <div>
      <h4>Author</h4>

      <section>
        <TextField name="title" />
        <SwapField fieldA="title" fieldB="content">
            <Icon name="refresh" />
        </SwapField>
        <TextField name="content" />
      </section>
    </div>

*/

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
