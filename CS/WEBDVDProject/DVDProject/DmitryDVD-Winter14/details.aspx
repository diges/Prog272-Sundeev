<%@ Page Title="Details" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="details.aspx.cs" Inherits="DmitryDVD_Winter14.details" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <h2>The Details Page</h2>

     <div class="hform">
        <asp:Label ID="dbErrorLabel" ForeColor="Red" runat="server" />
    </div>

    <div class="imgform">
        <asp:Image ID="Image1" runat="server" />
    </div>

    <div class="cform_details">
        <span class="widelabel">Artist:</span>  <asp:Label ID="txtDVDartist" runat="server" CssClass="widelabel2"></asp:Label>
        <span class="widelabel">Title:</span>   <asp:Label ID="txtDVDtitle" runat="server" CssClass="widelabel2"></asp:Label>
        <span class="widelabel">DVD Year:</span>   <asp:Label ID="txtDVDyear" runat="server" CssClass="widelabel2"></asp:Label>
        <span class="widelabel">Rating:</span>  <asp:Label ID="txtDVDrating" runat="server" CssClass="widelabel2"></asp:Label>
        <span class="widelabel">Price:</span>   <asp:Label ID="txtDVDprice" runat="server" CssClass="widelabel2"></asp:Label>
        <span class="widelabel">Description:</span> <asp:Label ID="txtDescription" runat="server" CssClass="widelabel3"></asp:Label>


        
    </div>

    <div class="bform">

    </div>





</asp:Content>
