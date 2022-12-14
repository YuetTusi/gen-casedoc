import styled from 'styled-components';

export const LayoutBox = styled.div`
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    display: flex;
    flex-direction: row;

    &>.menu{
        flex:none;
        width: 200px;
        background-color: #303a44;

        &>.caption{
            display: flex;
            justify-content: center;
            align-items: center;
            color: #06acb3;
            height: 50px;
            border-bottom: 1px solid #596570;
            letter-spacing: 1px;
            font-size: 1.4rem;
            text-align: center;
            .anticon{
                color:#06acb3;
                margin-right: .5rem;
            }
        }

        ul{
            margin:20px 0 0 0;
            padding: 0;
        }
        li{
            margin: 0;
            padding: 8px 20px;
            list-style-type: none;
            a{
                font-size: 1.2rem;
                color:#8391a2;
                &:hover{
                    color:#fff;
                }
                &.active{
                    color:#fff;
                }
            }
        }
    }
    &>.main{
        flex:1;
        width: auto;
        position: relative;
    }
`;

export const PageBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f9fafd;
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right: 0;
    
    &>.page-title{
        flex:none;
        height: 50px;
        border-bottom: 1px solid #b8bec3;
        color:#303a44;
        font-size: 1.4rem;
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items: flex-start;
        padding-left: 1rem;
    }
    &>.page-box{
        flex:1;
        position: absolute;
        top:50px;
        left:0;
        bottom:0;
        right: 0;
        padding: 20px;
    }
    .search-bar{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
    .scroll-box{
        position: absolute;
        top:60px;
        left:20px;
        right:20px;
        bottom:0;
        overflow-y: auto;
    }
`;