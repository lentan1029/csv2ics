//shim for rendering Blaze template for React
IncludeTemplate = React.createClass({
    componentDidMount() {
        var componentRoot = ReactDOM.findDOMNode(this);
        var parentNode = componentRoot.parentNode;
        parentNode.removeChild(componentRoot);
        // Render the Blaze template on this node
        this.view = Blaze.render(this.props.template, parentNode);
    },
    
    render(template) {
        return (<div />)
    }
});