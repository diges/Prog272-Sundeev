<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="EditDVD.aspx.cs" Inherits="DmitryDVD_Winter14.admin.EditDVD" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <h1>Edit DVD</h1> 
    <p>
    <asp:Button ID="btnLogout" runat="server" OnClick="btnLogout_Click" Text="Logoff" />
    </p>

    <div class="hform">
        <asp:Label ID="dbErrorLabel" ForeColor="Red" runat="server" />
        Select an DVD to update:<br />

        <asp:DropDownList ID="DVDList" runat="server" />
        <asp:Button ID="selectDVD" Text="Select" runat="server" OnClick="selectDVD_Click" />
    </div>

    <div class="imgform">
        <asp:Image ID="Image1" runat="server" />
    </div>

    <div class="cform">
        <span class="widelabel">Title:</span>   <asp:TextBox ID="txtDVDtitle" runat="server" />
        <span class="widelabel">Artist:</span>  <asp:TextBox ID="txtDVDartist" runat="server" />
        <span class="widelabel">Rating:</span>  <asp:TextBox ID="txtDVDrating" runat="server" />
        <span class="widelabel">Price:</span>   <asp:TextBox ID="txtDVDprice" runat="server" />
        <span class="widelabel">Image URL:</span> <asp:TextBox ID="txtDVDimg" runat="server" />
        
    </div>

    <div class="bform">
        <asp:Button ID="updateButton" Text="Update DVD" runat="server" OnClick="updateButton_Click" />
        <asp:Button ID ="deleteButton" Text ="Delete DVD" runat ="server" OnClick="deleteButton_Click" />
        <asp:Button ID="btnAdd" runat="server" OnClick="btnAdd_Click" Text="Add New DVD" />
    </div>

    




</asp:Content>
